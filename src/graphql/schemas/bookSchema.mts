
import gql from "graphql-tag";

// GraphQL schema definition
export const typeDefs = gql`
 extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  type Book @key(fields: "_id") {
    _id: ID!
    title: String!
    author: String!
    description: String
    price: Float!
    category: String!
  }

  type Query {
    books: [Book!]
    getBookByTitle(title: String!): Book
  }

  type Mutation {
    createBook(title: String!, author: String!, description: String, price: Float!, category: String!): Book
    updateBook(
      id: ID!
      title: String!
      author: String!
      description: String!
    ): Book
    deleteBook(id: ID!): String
  }
`;
