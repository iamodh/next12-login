import db from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    // email already exists
    if (user) {
      return res.status(200).end();
    }
    await db.user.create({
      data: {
        name,
        email,
      },
    });
    // success
    return res.status(201).end();
  }
  // wrong method
  return res.status(405).end();
}
