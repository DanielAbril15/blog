const Users = require("./users.models");
const Posts = require("./post.models");
const Categories = require("./category.models");

const initModels = () => {
  Posts.belongsTo(Users);
  Users.hasMany(Posts);

  Posts.belongsTo(Categories);
  Categories.hasMany(Posts);
};

module.exports = initModels;
