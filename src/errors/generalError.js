module.exports = ({status = 500, message}, _req, res, _next) => {

  console.error(message);

  res.status(status).json({ error: message });

  res.end();

};
