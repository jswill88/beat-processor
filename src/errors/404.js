module.exports = (req, _res, next) => {

  next({
    status: 404,
    message: `${req.baseUrl} is not a valid route`,
  });

};
