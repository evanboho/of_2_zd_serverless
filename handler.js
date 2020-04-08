'use strict';

const _ = require("lodash");
const moment = require("moment");

module.exports.sync = async event => {
  let text;
  let buff;
  let json;

  try {
    buff = Buffer.from(event.body, 'base64');
    text = buff.toString('ascii');
  } catch(e) {
    return {
      statusCode: 500,
      body: "Error decoding base64: " + JSON.stringify(e)
    }
  }

  try {
    json = JSON.parse(text);
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }

  if (json.check) {
    return {
      statusCode: 200,
      body: json.check
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      { message: "no check" },
      null,
      2
    ),
  };
};
