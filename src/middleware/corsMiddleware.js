const cors = require('cors');

module.exports = function corsMiddleware() {
  return (req, res, next) => {
    if (req.headers.origin) {
      cors()(req, res, next); // Apply cors middleware only if origin header is present
    } else {
      next(); // Continue to the next middleware if no origin header
    }
  };
};
