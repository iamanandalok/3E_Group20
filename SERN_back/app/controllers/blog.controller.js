const db = require("../models");
const blog = db.blogs;
const Op = db.Sequelize.Op;

// 1)Create and save a new blog
exports.create = (req, res) => {
  // Validate the request
  if (!req.body.title) {
    res.status(400).send({
      message: "The post cannot be empty!"
    });
    return;
  }

  
  blog.create({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while creating the blog post."
      });
    });
};

// 2)Retrieve all the blogs from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  blog.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred while finding the blogs."
      });
    });
};

// 3)Find a single blog with its id
exports.findOne = (req, res) => {
  const id = req.params.id;

  blog.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving the blog post (id=" + id + ")."
      });
    });
};

// 4)Update a blog using the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  blog.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "The post was updated successfully."
        });
      } else {
        res.send({
          message: `The blog (id=${id}) couldn't be updated. It may be empty/missing.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating the blog (id=" + id + ")."
      });
    });
};

// 5)Delete a blog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  blog.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "The post was deleted successfully!"
        });
      } else {
        res.send({
          message: `The post (id=${id}) couldn't be deleted. It may be absent.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Post (id=" + id + ") couldn't be deleted."
      });
    });
};

// 6)Delete all the blogs from the database.
exports.deleteAll = (req, res) => {
  blog.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} blogs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Sorry. An error occurred while deleting the blogs."
      });
    });
};

// 7)Find all the published posts
exports.findAllPublished = (req, res) => {
  blog.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "An error occurred."
      });
    });
};