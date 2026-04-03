// lib/mongodb.ts
import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local\n" +
    "Example: MONGODB_URI=mongodb://localhost:27017/pmpath"
  );
}

const options: MongoClientOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// In development, cache the client to avoid multiple connections during hot reload
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper: get a typed collection
export async function getCollection<T>(collectionName: string) {
  const client = await clientPromise;
  const db = client.db("pmpath");
  return db.collection<T>(collectionName);
}
