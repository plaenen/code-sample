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
  <!DOCTYPE html>
  <html>
    <head>
      <title>Code Sample</title>\
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css">
    </head>
    <body>
      <h1>Code Sample</h1>
      <div class="row">
        <div class="card large">
          <div class="section">
            <h3 class="doc">GraphQl API</h3>
            <p class="doc">An interactive IDE for the exposed API</p>
          </div>
          <div class="section">
            <a href="/graphql"> graphql query editor</a>
          </div>
        </div>
        <div class="card large">
          <div class="section">
            <h3 class="doc">Voyager</h3>
            <p class="doc">Explore the API in a more class-diagram fasion</p>
          </div>
          <div class="section">
            <a href="/voyager"> Voyager</a>
          </div>
        </div>
      </div>  
     

    </body>
  </html>
`
));
