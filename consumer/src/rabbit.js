const amqp = require("amqplib/callback_api");

function urlBuilder() {
    return `${process.env.RABBIT_URI}`;
}

module.exports.RabbitConnect = function () {
    const retryConnectionRate = parseInt(
        process.env.RABBIT_RETRY_CONNECTION_RATE || "5000"
    );
    return new Promise((resolve, reject) => {
        amqp.connect(urlBuilder(), (error, connection) => {
            if (error) {
                console.error(
                    `RabbitMq connection failed .... retrying every ${retryConnectionRate}ms `
                );

                return setTimeout(() => {
                    this.RabbitConnect();
                }, retryConnectionRate);
            } else {
                console.log(`RabbitMQ Attached continueing `);
                connection.on("close", () => {
                    console.log("amqp disconnected reconnecting....");
                    return setTimeout(
                        () => this.RabbitConnect(),
                        retryConnectionRate
                    );
                });
            }
            return resolve(connection);
        });
    }).catch((reason) => {
        return setTimeout(() => this.RabbitConnect(), retryConnectionRate);
    });
};
