import {NextApiRequest, NextApiResponse} from "next";
import {ObjectId} from "mongodb";
import {connectDatabase, getAllDocuments, insertDocument} from "@/helpers/db-utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId: string = req.query?.eventId as string;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({message: 'Connecting to the database failed'});
    return;
  }

  if (req.method === 'POST') {
    const {email, name, text} = req.body;

    if (!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
      res.status(422).json({message: 'Invalid inputs'});
      await client.close();
      return;
    }

    const newComment: {id?: ObjectId, email: string, name: string, text: string, eventId: string} = {
      email,
      name,
      text,
      eventId,
    }

    const result = await insertDocument(client, 'comments', newComment);

    //newComment.id = result.insertedId;

    await client.close();

    res.status(201).json({
      message: 'Added comment.',
      comment: newComment,
    });
  }

  if (req.method === 'GET') {
    const document = await getAllDocuments(client, 'comments', {_id: -1}, { eventId: eventId });
    await client.close();
    res.status(200).json({comments: document});
  }
}

export default handler;
