import express, { Router, Request, Response } from "express";
 
import platformAPIClient from "../services/platformAPIClient";
 
export const handleSignIn = async (req: Request, res: Response) => {
  const auth = req.body?.authResult;
  const userCollection = req.app.locals.userCollection;

  if (!auth?.accessToken || !auth?.user?.uid || !auth?.user?.username) {
    return res.status(400).json({ error: "bad_request", message: "Missing required authResult payload" });
  }

  if (!userCollection) {
    return res.status(503).json({ error: "service_unavailable", message: "Database not ready" });
  }

  try {
    // Verify the user's access token with the /me endpoint:
    await platformAPIClient.get(`/v2/me`, { headers: { Authorization: `Bearer ${auth.accessToken}` } });
  } catch (err) {
    console.error("Error verifying access token:", err);
    return res.status(401).json({ error: "invalid_token", message: "Invalid access token" });
  }

  try {
    let currentUser = await userCollection.findOne({ uid: auth.user.uid });

    if (currentUser) {
      await userCollection.updateOne(
        {
          _id: currentUser._id,
        },
        {
          $set: {
            accessToken: auth.accessToken,
          },
        },
      );
    } else {
      const insertResult = await userCollection.insertOne({
        username: auth.user.username,
        uid: auth.user.uid,
        roles: auth.user.roles,
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

  // GET /user/signout
  router.get("/signout", async (req: Request, res: Response) => {
    req.session.currentUser = null;
    return res.status(200).json({ message: "User signed out" });
  });
}
