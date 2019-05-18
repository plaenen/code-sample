// const { ApolloServer } = require('apollo-server');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const voyagerMiddleware = require('graphql-voyager/middleware').express;
const typeDefs = require('./graphql/schema.js');
const resolvers = require('./graphql/resolver.js');

// // Create and start the Apollo Server
// const server = new ApolloServer({ typeDefs, resolvers });
// server.listen().then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });

// Create an express server
const app = express();
const port = 4000;

// Create an graphql middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  debug: true,
  engine: false,
  tracing: true,
});

server.applyMiddleware({ app }); // app is from an existing express app

// Create a voyager graphql visualisation middleware
// Visualises the graph in an navigatable entity diagram alike view
app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
app.listen(port, () => console.log(`code-sample app listening on http://localhost:${port}!`));

process.on('uncaughtException', (reason, p) => {
  console.log('Uncaught Exception  at:', p, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

app.get('/', (req, res) => res.send(`
  <html>
    <a href="/graphql"> graphql</a>
    <a href="/voyager"> voyager</a>
  </html>
`
));
