import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export default async function handler(request, response) {
  try {
    // Allow requests from any origin
    response.setHeader("Access-Control-Allow-Origin", "*");

    const client = await new MongoClient(uri, options).connect();
    console.log("Just Connected to MongoDB");
    const db = client.db("offeredCourses-db");
    const collection = db.collection("offeredCourses-collection");
    const results = await collection.find({}).toArray();
    response.status(200).json(results);
    // response.status is used to set the HTTP status code, and json is used to send a JSON response.
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    response.status(500).json(e);
  }
}
