import {NextApiRequest, NextApiResponse} from "next";
import {connectDatabase, insertDocument} from "@/helpers/db-utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const email = req.body.email;

    if (!email || !email.includes('@')) {
      res.status(422).json({message: 'Invalid email address'});
      return;
    }

    try {
      const client = await connectDatabase();
      await insertDocument<{email: string}>(client, 'newsletter', {email: email});

      await client.close();
    } catch (error) {
      res.status(500).json({message: 'Connecting to the database failed'});
      return;
    }

    res.status(201).json({message: 'Signed up!'});
  }
}

export default handler;
