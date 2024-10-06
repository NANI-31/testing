// module.exports = function(app) {
//     app.use((req, res, next) => {
//       if (req.path.endsWith('.map')) {
//         res.status(404).send('Not found');
//       } else {
//         next();
//       }
//     });
//   };