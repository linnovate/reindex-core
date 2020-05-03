module.exports = `
type Query
type Mutation
type Subscription
scalar JSON
schema {
query: Query
mutation:Mutation
subscription: Subscription
}

extend type Query {
    hello: String
}

extend type Mutation {
    world: String
}

extend type Subscription {
    helloWorld: String
}
`;
