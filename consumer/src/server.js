const express = require("express");
const bodyParser = require("body-parser");
const errors = require("restify-errors");
const { logger } = require("./logger");
//const { consumer } = require("@reindex/plugins");
//const { routes } = consumer;
const rabbit = require("./rabbit");
require("./worker");

global.connection = null;

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

routes.forEach((route) => {
    if (route.serviceName == process.env.SERVICE_NAME) {
        server.post(route.name, async (req, res, next) => {
            const QUEUE = route.queue;
            //create rabbit connection
            const connection = await rabbit.RabbitConnect();

            // use the connection to create channel
            await connection.createChannel((err, ch) => {
                const message = JSON.stringify(req.body);

                console.info(
                    `Rabbit Producer sending to ${QUEUE} the following message ${message}`
                );
                ch.assertQueue(QUEUE);
                ch.sendToQueue(QUEUE, Buffer.from(message));
            });
            return res.status(200).json({ message: "ok" });
        });
    }
});

function errorHandler(err, req, res, next) {
    if (err instanceof errors.HttpError) {
        res.status(err.statusCode).json(err.body);
    }

    res.status(500).json({
        code: "InternalError",
        message: err.message || "Fatal error",
    });
    return;
}

server.use(errorHandler);

const serverPort = parseInt(process.env.PORT || "3001");
server.listen(serverPort, function () {
    console.log(
        `${process.env.SERVICE_NAME} of type consumer is listening on ${serverPort} with mode ${process.env.NODE_ENV}`
    );
});
