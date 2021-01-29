module.exports = (_req, res, next) => {
  try {
    res
      .status(200)
      .cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
      })
      .send();
  } catch (e) {
    next({ message: e.message });
  }
};
