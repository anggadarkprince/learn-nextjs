import {MongoClient, OptionalId, Sort} from "mongodb";

export async function connectDatabase() {
  const url = 'mongodb+srv://angga:anggaari@express-shop.tswha.mongodb.net/?retryWrites=true&w=majority';
  return new MongoClient(url);
}

export async function insertDocument<T>(client: MongoClient, collectionName: string, document: OptionalId<T>) {
  const db = client.db('events');
  const collection = db.collection(collectionName);
  return await collection.insertOne(document);
}

export async function getAllDocuments(client: MongoClient, collectionName: string, sort: Sort, filter = {}) {
  const db = client.db('events');
  return await db
    .collection(collectionName)
    .find(filter)
    .sort(sort)
    .toArray();
}
