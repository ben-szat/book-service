import { ApolloServer } from "@apollo/server";
import express from "express";
import { typeDefs } from "./graphql/schemas/bookSchema.mts";
import { resolvers } from "./graphql/resolvers/bookResolvers.mts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { MongoClient } from "mongodb";

const MONGO_URI = "mongodb://root:rootpwd@mongo:27017/";
const client = new MongoClient(MONGO_URI);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB");

    // Get the books database
    const db = client.db("book-service-db");
    const booksCollection = db.collection("books");

    // Apollo Server instance
    const server = new ApolloServer({
      schema: buildSubgraphSchema({ typeDefs, resolvers }),
    });

    // ✅ Pass the MongoDB collection in context
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4001 },
      context: async () => ({ db, booksCollection }), // Now accessible in resolvers
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

startServer();