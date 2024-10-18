import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, webhookUrl, date, time } = req.body;

  if (!email && !webhookUrl) {
    return res
      .status(400)
      .json({ error: "Missing email or webhookUrl parameter" });
  }

  try {
    const docRef = await addDoc(collection(db, "notificationSettings"), {
      email,
      webhookUrl,
      date,
      time,
    });

    return res.status(200).json({ id: docRef.id });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to save notification settings" });
  }
}
