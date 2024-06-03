// import { ApolloServer } from "apollo-server-micro";
import { ApolloServer } from "@apollo/server";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

import { typeDefs, resolvers } from "@/app/api/properties/schema";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import mysql from "mysql2/promise";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req, res) => ({
    req,
    res,
    dataSources: {},
  }),
});
export async function GET(request: NextRequest) {
  return handler(request);
}
export async function POST(request: NextRequest) {
  try {
    const res = await handler(request);
    return res;
  } catch (error) {
    throw error;
  }
}
