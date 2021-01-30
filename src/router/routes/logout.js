module.exports = (_req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie('songId')
      .clearCookie('token')
      .send();
  } catch (e) {
    next({ message: e.message });
  }
};
