const router = require("express").Router();
const passport = require("passport");
const postServices = require("./posts.services");

router
  .route("/")
  .get(postServices.getAllPosts)
  .post(
    passport.authenticate("jwt", { session: false }),
    postServices.createPost
  );

module.exports = router;
