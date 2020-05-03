const Logger = require("./utils/logger");
try {
  require.resolve("@reindex/plugins");
} catch (Exception) {
  throw Exception;
}

const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const winston = require("winston");
const expressWinston = require("express-winston");
const { PORT, SERVICE_NAME } = require("./config");
const { model } = require("@reindex/plugins");
const { routes } = model;
const app = express();
const utilRoutes = require("./utils/routes/index");
const listEndPoints = require("express-list-endpoints");

app.disable("x-powered-by");
app.disable("etag");
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "100mb" })); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-

if (process.env.NODE_ENV === "production")
  app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console()],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      )
    })
  );

app.use(utilRoutes);

routes.forEach(route => {
  if (route.serviceName == SERVICE_NAME) {
    app.use(route.router);
  }
});

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  })
);

// print endpoints
const endpoints = listEndPoints(app);

endpoints.forEach(endpoint => {
  console.log(
    `registered path - ${endpoint.path} with methods: ${endpoint.methods}`
  );
});

// Listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
