const postControllers = require("./posts.controllers");
const { host } = require("../config");

const getAllPosts = (req, res) => {
  const offset = Number(req.query.offset) || 0;
  const limit = Number(req.query.limit) || 10;

  const urlBase = `${host}/api/v1/posts`;

  postControllers
    .getAllPosts(offset, limit)
    .then((data) => {
      res.status(200).json({
        urlBase,
        next: `${urlBase}?offset=${offset + limit}&limit=${limit}`,
        previus:
          offset === 0
            ? null
            : `${urlBase}?offset=${offset - limit}&limit=${limit}`,
        offset,
        limit,
        results: data,
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
const createPost = (req, res) => {
  const userId = req.user.id;
  const { title, content, categoryId } = req.body;
  if (title && content && categoryId) {
    postControllers
      .createPost({ title, content, userId, categoryId })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        res.status(400).json(err.message);
      });
  } else {
    res.status(400).json({
      message: " Missing data",
      fields: {
        title: "string",
        content: "string",
        categoryId: "uuid",
      },
    });
  }
};

const getPostByCategory = (req, res) => {
  const categoryId = req.params.id;

  postControllers
    .getPostByCategory(categoryId)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostByCategory,
};
