const cors = require('cors');

module.exports = cors({
  origin: 'http://localhost:8000', // Replace with your client's URL
  credentials: true, // Enable credentials (cookies, headers) for cross-origin requests
});
