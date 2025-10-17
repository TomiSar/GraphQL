const express = require('express');
const colors = require('colors');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('../server/config/db');
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from node server!! This is a starting endpoint for server');
});

require('dotenv').config({ path: __dirname + '/.env' });

// Connect to database
connectDB();
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`.white.bold);
});
