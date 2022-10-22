const Posts = require("../models/post.models");

const uuid = require("uuid");
const Categories = require("../models/category.models");
const Users = require("../models/users.models");

const getAllPosts = async () => {
  const data = await Posts.findAll({
    attributes: {
      exclude: ["userId", "categoryId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email"],
      },
      {
        model: Categories,
        as: "category",
      },
    ],
  });
  return data;
};
const getPostById = async (id) => {
  const data = await Posts.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["userId", "categoryId", "createdAt", "updatedAt"],
    },
    include: [
      {
        model: Users,
        as: "user",
        attributes: ["id", "firstName", "lastName", "email"],
      },
      {
        model: Categories,
        as: "category",
      },
    ],
  });
  return data;
};

const createPost = async (data) => {
  const response = await Posts.create({
    id: uuid.v4(),
    title: data.title,
    content: data.content,
    userId: data.userId,
    categoryId: data.categoryId,
  });
  return response;
};

const getPostByCategory = async (categoryId) => {
  const data = await Posts.findAll({
    where: {
      categoryId,
    },
  });
  return data;
};
module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  getPostByCategory,
};
