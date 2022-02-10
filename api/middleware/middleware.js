function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = new Date().toLocaleDateString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`${timeStamp}, ${method}, ${url}`);
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log("validateUserId middleware");
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log("validateUser middleware");
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log("validatePost middleware");
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
