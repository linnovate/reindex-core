module.exports = {
  SERVICE_NAME: process.env.SERVICE_NAME,
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  MONGO_LOST_CONNECTION_RETRIES_ALERT:
    process.env.MONGO_LOST_CONNECTION_RETRIES_ALERT,
  ELASTIC_SEARCH_URL: process.env.ELASTIC_SEARCH_URL,
  ELASTIC_INDEX_HISTORY: process.env.ELASTIC_INDEX_HISTORY,
  ELASTIC_INDEX_PROFILE: process.env.ELASTIC_INDEX_PROFILE,
  RABBIT_MQ_URL: process.env.RABBIT_MQ_URL,
  PORT: process.env.PORT,
  DEBUG: process.env.DEBUG,
  NODE_ENV: process.env.NODE_ENV,
  ADMIN_SECRET_TOKEN: process.env.ADMIN_SECRET_TOKEN,
  alert: {
    url: process.env.ALERT_MANAGER_URL,
    username: process.env.ALERT_MANAGER_USER,
    password: process.env.ALERT_MANAGER_PASSWORD
  },
  messages: {
    DB_CONNECTION_ERROR: "Mongoose connection failed.....",
    DB_CONNECTION_SUCCESSFUL:
      "Mongoose connected successfully to the database...."
  }
};
