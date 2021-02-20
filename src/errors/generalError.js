module.exports = ({ status = 500, message }, _req, res, _next) => {

  console.error(message);

  class FakeError extends Error { }

  const error = new FakeError(message);
  error.status = status;

  res.status(status).send({
    error: true,
    message: error.message,
    status: error.status,
  });

  res.end();

};
