import { ApolloServer } from "@apollo/server";
import express from "express";
import { typeDefs } from "./graphql/schemas/bookSchema.mts";
import { resolvers } from "./graphql/resolvers/bookResolvers.mts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";

const app = express();
const port = 4000;
const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at ${url}`);


app.get("/", (req: any, res: any) => {
  res.send("Hello World!!!!!");
});
