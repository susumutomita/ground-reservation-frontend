import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  const { date, ground } = req.query;

  if (!date || !ground) {
    return res.status(400).json({ error: "Missing date or ground parameter" });
  }

  try {
    const q = query(
      collection(db, "availability"),
      where("date", "==", date),
      where("ground", "==", ground),
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}
