// function to send response back to front
exports.sendResponse = (res, response, CodeStatus, data, message = '', devMessage = '') => {
  res.status(CodeStatus).send({
    CodeStatus,
    response,
    data,
    message,
    devMessage,
  });
};
