// function to send response back to front
exports.sendResponse = (res, response, code, data, message = '', devMessage = '') => {
  res.status(code).send({
    response,
    data,
    message,
    devMessage,
  });
};
