module.exports = ({status = 500, message}, _req, res, _next) => {

  console.error(message);

  const error = new Error(message);
  error.status = status;

  res.status(status).json({
    error: {
      message: error.message,
      status: error.status,
    },
  });

  res.end();

};
