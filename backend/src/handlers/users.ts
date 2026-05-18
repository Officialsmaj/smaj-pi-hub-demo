import { Router, Request, Response } from "express";

import platformAPIClient from "../services/platformAPIClient";

type VerifiedPiUser = {
  uid?: string;
  username?: string;
};

const destroySession = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during signout:", err);
      return res.status(500).json({ error: "internal_error", message: "Failed to sign out" });
    }

    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "User signed out" });
  });
};

export const handleSignIn = async (req: Request, res: Response) => {
  const auth = req.body?.authResult;
  const userCollection = req.app.locals.userCollection;

  if (!auth?.accessToken || !auth?.user?.uid || !auth?.user?.username) {
    return res.status(400).json({ error: "bad_request", message: "Missing required authResult payload" });
  }

  if (!userCollection) {
    return res.status(503).json({ error: "service_unavailable", message: "Database not ready" });
  }

  let verifiedUser: VerifiedPiUser;

  try {
    const meResponse = await platformAPIClient.get<VerifiedPiUser>("/v2/me", {
      headers: { Authorization: `Bearer ${auth.accessToken}` },
    });
    verifiedUser = meResponse.data ?? {};
  } catch (err) {
    console.error("Error verifying access token:", err);
    return res.status(401).json({ error: "invalid_token", message: "Invalid access token" });
  }

  if (verifiedUser.uid && verifiedUser.uid !== auth.user.uid) {
    return res.status(401).json({ error: "invalid_token", message: "Authenticated user mismatch" });
  }

  if (verifiedUser.username && verifiedUser.username !== auth.user.username) {
    return res.status(401).json({ error: "invalid_token", message: "Authenticated username mismatch" });
  }

  const normalizedUser = {
    uid: verifiedUser.uid || auth.user.uid,
    username: verifiedUser.username || auth.user.username,
    roles: Array.isArray(auth.user.roles) ? auth.user.roles : [],
  };

  try {
    let currentUser = await userCollection.findOne({ uid: normalizedUser.uid });

    if (currentUser) {
      await userCollection.updateOne(
        {
          _id: currentUser._id,
        },
        {
          $set: {
            username: normalizedUser.username,
            roles: normalizedUser.roles,
            accessToken: auth.accessToken,
          },
        },
      );

      currentUser = await userCollection.findOne({ _id: currentUser._id });
    } else {
      const insertResult = await userCollection.insertOne({
        username: normalizedUser.username,
        uid: normalizedUser.uid,
        roles: normalizedUser.roles,
        accessToken: auth.accessToken,
      });

      currentUser = await userCollection.findOne(insertResult.insertedId);
    }

    req.session.currentUser = currentUser;
    return res.status(200).json({ message: "User signed in", user: currentUser });
  } catch (err) {
    console.error("Error during signin:", err);
    return res.status(500).json({ error: "internal_error", message: "Failed to sign in" });
  }
};

export default function mountUserEndpoints(router: Router) {
  // POST /user/signin
  router.post("/signin", handleSignIn);

  // GET /user (session check)
  router.get("/", async (req: Request, res: Response) => {
    return res.status(200).json({
      user: req.session.currentUser ?? null,
    });
  });

  // GET|POST /user/signout
  router.get("/signout", destroySession);
  router.post("/signout", destroySession);
}
