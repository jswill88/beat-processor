module.exports = (_req, res, next) => {
  try {
    res
      .status(200)
      .clearCookie('songId')
      .clearCookie('token')
      .json('Logged out successfully');
  } catch (e) {
    next({ message: e.message });
  }
};
