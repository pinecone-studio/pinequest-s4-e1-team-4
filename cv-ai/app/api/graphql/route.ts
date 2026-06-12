import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
 
const typeDefs = `#graphql
  type User {
    id: ID!
    clerkId: String!
    email: String!
    name: String
    resumes: [Resume!]!
  }
 
  type Resume {
    id: ID!
    name: String!
    skills: [String!]!
    rawJson: String!
    createdAt: String!
  }
 
  type UiText {
    id: ID!
    page: String!
    key: String!
    valueMn: String!
    valueEn: String!
  }
 
  type Query {
    getCurrentUser: User
    getUiTextsByPage(page: String!): [UiText!]!
  }
 
  type Mutation {
    saveResume(name: String!, skills: [String!]!, rawJson: String!): Resume!
  }
`;
 
const resolvers = {
  Query: {
    getCurrentUser: async (_: any, __: any, context: any) => {
      if (!context.clerkId) throw new Error("Нэвтрээгүй байна!");
 
      return await db.user.findUnique({
        where: { clerkId: context.clerkId },
        include: { resumes: true },
      });
    },
 
    getUiTextsByPage: async (_: any, args: { page: string }) => {
      return await db.uiText.findMany({
        where: { page: args.page },
      });
    },
  },
 
  Mutation: {
    saveResume: async (
      _: any,
      args: { name: string; skills: string[]; rawJson: string },
      context: any,
    ) => {
      if (!context.clerkId) throw new Error("Нэвтрээгүй байна!");
 
      const user = await db.user.findUnique({
        where: { clerkId: context.clerkId },
      });
 
      if (!user) throw new Error("Хэрэглэгч бүртгэлгүй байна!");
 
      return await db.resume.create({
        data: {
          userId: user.id,
          name: args.name,
          skills: args.skills,
          rawJson: JSON.parse(args.rawJson),
        },
      });
    },
  },
};
 
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
 
const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const { userId } = await auth();
    return { clerkId: userId };
  },
});
 
export { handler as GET, handler as POST };
