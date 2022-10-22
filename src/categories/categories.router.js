const router = require("express").Router();

const categoriesServices = require("./categories.services");
const { getPostByCategory } = require("../posts/posts.services");

router
  .route("/")
  .get(categoriesServices.getAllCategories)
  .post(categoriesServices.postCategory);

router.get("/:id", categoriesServices.getCategoryById);

router.get("/:id/posts", getPostByCategory);

module.exports = router;
