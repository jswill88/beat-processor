/**
 * @name test Route to practice and do experiments on
 */

module.exports = (req, res, next) => {
  // const { token } = req.cookies;
  // console.log(songId);
  console.log(req.body);

  res.json('test workds');
};
