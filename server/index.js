const express = require('express');
const colors = require('colors');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('../server/config/db');
const port = process.env.PORT || 5000;
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const {
  ApolloServerPluginLandingPageLocalDefault,
} = require('@apollo/server/plugin/landingPage/default');

const app = express();
const httpServer = require('http').createServer(app);

app.get('/', (req, res) => {
  res.send('Hello from node server!! This is a starting endpoint for server');
});

require('dotenv').config({ path: __dirname + '/.env' });

// Connect to database
connectDB();
app.use(cors());
app.use(express.json());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true, footer: false }),
    ],
    introspection: true,
  });

  await server.start();
  app.use('/graphql', expressMiddleware(server));

  // Apply Apollo middleware
  httpServer.listen(port, () => {
    console.log(`Server ready at http://localhost:${port}/graphql`.white.bold);
  });
};

startServer().catch((error) => {
  console.error(`Failed to server on port ${port}`.red.bold, error);
});
