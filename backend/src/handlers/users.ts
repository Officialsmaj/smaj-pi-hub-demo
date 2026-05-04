import express, { Router, Request, Response } from "express";
 
 import platformAPIClient from "../services/platformAPIClient";
 
export default function mountUserEndpoints(router: Router) {
  // POST /user/signin
  router.post("/signin", async (req: Request, res: Response) => {
    // handle the user auth accordingly
    console.log("=== POST /user/signin HIT ===", req.body?.authResult?.user?.username || "no user");
    console.log("AccessToken length:", req.body?.authResult?.accessToken?.length || "no token");
    const auth = req.body.authResult;
    const userCollection = req.app.locals.userCollection;

    if (!userCollection) {
      return res.status(503).json({ error: "service_unavailable", message: "Database not ready" });
    }

try {
      // Verify the user's access token with the /me endpoint:
      console.log("Calling Pi /me with token...");
      const me = await platformAPIClient.get(`/v2/me`, { headers: { Authorization: `Bearer ${auth.accessToken}` } });
      console.log("Pi /me response:", me.status, me.data?.username || "no username");
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
  });

  // GET /user/signout
  router.get("/signout", async (req: Request, res: Response) => {
    req.session.currentUser = null;
    return res.status(200).json({ message: "User signed out" });
  });
}
