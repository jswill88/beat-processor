module.exports = (_req, res, next) => {
  try {
    res
      .status(200)
      .json('Logged out successfully');
  } catch (e) {
    next({ message: e.message });
  }
};
