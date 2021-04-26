const errorHandler = (err, req, res, next) => {
  switch (err.code) {
    case 400:
    case 401:
    case 403:
    case 404:
    case 405:
      res.status(err.code).json({ message: err.message });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};

module.exports = errorHandler;
