const express = require("express");
const _ = require("lodash");
const bodyParser = require("body-parser");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const data = require("./data.json");

const { PORT = 3001 } = process.env;

const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    avatarUrl: String
    accounts: [Account!]!
  }

  type Account {
    id: ID!
    name: String!
    balance: Float!
    user: User!
  }

  input AccountInput {
    name: String!
    balance: Float!
  }

  type Query {
    user(id: ID!): User!
    users: [User!]!
    account(id: ID!): Account!
    # take the userId from the
    accounts: [Account!]!
  }

  type Mutation {
    updateAccount(id: ID!, input: AccountInput!): Account!
  }
`;

const resolvers = {
  Query: {
    user: (_, { id }) => {
      return data.find(user => user.id === id);
    },
    users: () => data,
    account: (_, { id }, { userId }) => {
      const userData = data.find(u => u.id === userId);
      return userData.accounts.find(a => a.id === id);
    },
    accounts: (_, {}, { userId }) => {
      const userData = data.find(u => u.id === userId);
      return userData.accounts;
    }
  },
  Account: {
    user: ({ id: accountId }) => {
      const user = _.find(data, u =>
        _.find(u.accounts, a => a.id === accountId)
      );
      return user;
    }
  },
  Mutation: {
    updateAccount: (_, { id, input }) => {
      let account;
      // find account
      data.forEach(u => {
        u.accounts.forEach(a => {
          if (a.id === id) {
            account = a;
          }
        });
      });
      account.name = input.name;
      account.balance = input.balance;
      return account;
    }
  }
};

const app = express();

app.use(bodyParser.json());
app.use(cors());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: ({ req }) => {
    const userId = req.header("user-id");
    if (userId) {
      return {
        userId
      };
    }
  },
  formatError: err => {
    console.log(err.message);
  }
});

server.applyMiddleware({ app, path: "/api/graphql", cors: true });
app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});
