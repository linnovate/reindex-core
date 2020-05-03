const { merge, extend } = require("lodash");
const { makeExecutableSchema } = require("graphql-tools");
const GraphQLJSON = require("graphql-type-json");
// root type defs
const rootTypeDefs = require("./root.schema");
// Extensions typedefs

const executableSchema = makeExecutableSchema({
    typeDefs: [rootTypeDefs],
    resolvers: {},
    schemaDirectives: {},
});

module.exports = executableSchema;
