import { NextApiRequest, NextApiResponse } from "next";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApps, cert } from "firebase-admin/app";

if (!getApps().length) {
  initializeApp({
    credential: cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
    ),
  });
}

const db = getFirestore();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { userId, type, value } = req.body;

      await db.collection("notificationSettings").doc(userId).set(
        {
          type,
          value,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      res
        .status(200)
        .json({ message: "Notification settings saved successfully" });
    } catch (error) {
      console.error("Error saving notification settings:", error);
      res.status(500).json({ error: "Failed to save notification settings" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
