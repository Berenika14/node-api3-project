const express = require("express");

// You will need `users-model.js` and `posts-model.js` both
const User = require("../users/users-model");
const Post = require("../posts/posts-model");

// The middleware functions also need to be required
const {
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.get("/:id", validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  User.getById(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.post("/", validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert({ name: req.name })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, { name: req.name })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch();
});

router.delete("/:id", validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id

  User.remove(req.params.id)
    .then(() => {
      res.json(req.user);
    })
    .catch(next);
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.params.id)
    .then((posts) => {
      res.json(posts);
    })
    .catch(next);
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log(req.user);
  console.log(req.text);
});

router.use((err, req, res, next) => {
  res.status(
    (err.status || 500).json({
      customMessage: "Something bad inside Post router happened",
      message: err.message,
      stack: err.stack,
    })
  );
});

// do not forget to export the router

module.exports = router;
