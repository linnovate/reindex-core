module.exports = {
  port: process.env.PORT,
  rabbitUri: process.env.RABBITMQ_URI,
  elastic: {
    uri: process.env.ELASTIC_URI,
    modelIndex: process.env.ELASTIC_MODEL_INDEX,
    customDataIndex: process.env.ELASTIC_CUSTOMDATA_INDEX,
    type: process.env.ELASTIC_TYPE
  }
};
