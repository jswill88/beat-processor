module.exports = (req, _res, next) => {
  console.log(req);
  next({
    status: 404,
    message: `${req.baseUrl} is not a valid route`,
  });

};
