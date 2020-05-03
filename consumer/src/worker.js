//const { consumer } = require("@reindex/plugins");
//const { queues } = consumer;
const rabbit = require("./rabbit");

rabbit.RabbitConnect().then((connection) => {
    queues.forEach((queue) => {
        connection.createChannel((err, ch) => {
            if (err) throw err;

            ch.assertQueue(queue.name);
            ch.consume(queue.name, (msg) => {
                console.info(
                    `Rabbit Consumer received in ${queue.name} the following message ${msg}`
                );
                queue.controller(ch, msg);
            });
        });
    });
});
