const { ApolloServer } = require("apollo-server-express");
const cookieParser = require("cookie-parser");
const schema = require("./schema");

module.exports = {
    createApolloServer: (app) => {
        const server = new ApolloServer({
            schema,
            dataSources: () => {
                return dataSources;
            },
            context: ({ req, res }) => {
                return {
                    conn: () => {
                        if (connectors) return connectors;
                        else return {};
                    },
                    req,
                    res,
                    cookies: req.cookies,
                    token:
                        cookieParser.JSONCookies(req.cookies)[
                            process.env.AUTHENTICATION_COOKIE_NAME || "jwt"
                        ] ||
                        (req.headers && req.headers.authorization),
                    host: req.get("origin"),
                    connection: req.connection,
                };
            },
        });
        server.applyMiddleware({ app, path: "/graphql", cors: true });
        return server;
    },
};
