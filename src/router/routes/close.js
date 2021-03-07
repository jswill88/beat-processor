// module.exports = (req, res, next) => {
//   try {
//     const { songId } = req.cookies;

//     if (!songId || songId === 'undefined') {
//       return next({
//         status: 500,
//         message: 'No song to close',
//       });
//     }

//     res
//       .status(200)
//       // .clearCookie('songId')
//       .json('Song successfully closed');

//   } catch (e) {
//     next({ message: e.message });
//   }
// };
