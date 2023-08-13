import {NextApiRequest, NextApiResponse} from "next";
import {MongoClient, ObjectId} from "mongodb";

type MessageType = {
  id?: ObjectId,
  email: string,
  name: string,
  message: string,
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {email, name, message} = req.body;

    if (!email || !email.includes('@') || !name || name.trim() === '' || !message || message.trim() === '') {
      res.status(422).json({message: 'Invalid inputs'});
      return;
    }

    const newMessage: MessageType = {
      email,
      name,
      message,
    }

    let client;
    try {
      const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;
      client = new MongoClient(url);
    } catch(error) {
      res.status(500).json({message: 'Could not connect to database'});
      return;
    }

    try {
      const db = client.db('blog');
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch(error) {
      client.close();
      res.status(500).json({message: 'Something went wrong'});
      return;
    }
    client.close();

    res.status(201).json({message: 'Successfully stored message', data: newMessage});
  }
}

export default handler;
