const { ApolloServer, gql } = require('apollo-server');
const typeDefs = require('./graphql/schema.js');
const resolvers = require('./graphql/resolver.js');

// Create and start the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
