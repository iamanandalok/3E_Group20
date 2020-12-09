module.exports = (sequelize, Sequelize) => {
  const blog = sequelize.define("blog", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return blog;
};