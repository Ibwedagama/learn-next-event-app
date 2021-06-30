import { MongoClient } from 'mongodb';

const mongodbUsername = process.env.NEXT_PUBLIC_MONGODB_USERNAME
const mongodbPassword = process.env.NEXT_PUBLIC_MONGODB_PASSWORD

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.o7zvx.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    .sort(sort)
    .toArray();

  return documents;
}