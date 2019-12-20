require('dotenv').config();
require('now-env');

import { makeExecutableSchema } from 'graphql-tools'
const { gql } = require('apollo-server-micro');

// schemas
var commonSchema = require('./resources/common.schema');
var teamSchema = require('./resources/team.schema');
var matchSchema = require('./resources/match.schema');

// queries
var commonQuery = require('./resources/common.query');
var teamQuery = require('./resources/team.query');
var matchQuery = require('./resources/match.query');

// Mutations

// resolvers
var commonResolvers = require('./resources/common.resolvers');
var teamResolvers = require('./resources/team.resolvers');
var matchResolvers = require('./resources/match.resolvers');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    ${ commonQuery }
    ${ matchQuery }
    ${ teamQuery }
  }
  ${ commonSchema }
  ${ matchSchema }
  ${ teamSchema }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    ...commonResolvers,
    ...matchResolvers,
    ...teamResolvers
  }
};

//
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  engine: {
    apiKey: process.env.ENGINE_KEY
  },
  introspection: true,
  tracing: true
})
