const { url, username, password } = require("../config").alert;
const Logger = require("./logger");
const request = require("request");

const sendAlert = alert => {
  const options = {
    method: "POST",
    auth: {
      user: username,
      pass: password,
      sendImmediately: true
    },
    headers: {
      "content-type": "application/json"
    },
    json: alert
  };
  try {
    request.post(url, options, (err, res, body) => {
      if (err) throw err;
      Logger.log("AlertManager response : ", body);
    });
  } catch (err) {
    Logger.log(err);
  }
  Logger.log(alert);
};

module.exports.sendAlert = sendAlert;
