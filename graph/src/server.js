const express = require("express");
const { createServer } = require("http");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { logger } = require("./logger");
const { ApolloServer } = require("apollo-server-express");
let server = require("./api");

const isProduction = () => {
    switch (process.env.NODE_ENV) {
        case "development": {
            return false;
            break;
        }
        case "production": {
            return true;
            break;
        }
        default: {
            return false;
        }
    }
};

const app = express();

server = server.createApolloServer(app);

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

app.use(bodyParser.json({ limit: "100mb" }));
app.use(cookieParser());

app.get("/api/status/health", (req, res, next) => {
    res.status(200).send();
});

const runPort = parseInt(process.env.PORT) || 3000;

httpServer.listen({ port: runPort }, () => {
    console.log(
        `Apollo Server running on ${runPort} with mode ${process.env.NODE_ENV}`
    );
});
