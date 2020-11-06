const db = require("../models");
const crypto = require('crypto');
const User = db.users;
const Op = db.Sequelize.Op;

function encryptPassword(plaintext) {

  const secret = plaintext;
  const hash = crypto.createHmac('sha512', secret)
                    .update('I love coding')
                    .digest('hex');
  return hash;
}
// Create and Save a new User
exports.create = (req, res) => {

  console.log('i m in controller req.body is',req.body);
  
  // Validate request
  if (!req.body.username) {
    res.status(400).send();
    return;
  }

  // Create a User
  const userData = {
    fullname: req.body.fullname,
    username: req.body.username,
    password: encryptPassword(req.body.password),
  };

  // Save User in the database
  User.create(userData)
    .then(data => {
      res.status(200).json(
        {
          id: data.id,
          username: data.username,
          isSignupDone: true
        }
      );
    })
    .catch(err => {
      res.status(500).send({
        isSignupDone: false
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an username
exports.findWithUsernamePassword = (req, res) => {
  const { username, password } = req.body;
  const encryptedPassword = encryptPassword(password);

  User.findAll({ where: { username: username, password: encryptedPassword } })
    .then(data => {
      console.log('data.len-->',data);
      if(data.length > 0) {
        res.status(200).json({
          isLoginSuccess: true,
          id: data[0].id,
          fullname: data[0].fullname,
          username: data[0].username,

        });
      }
      res.status(401).json({
        isLoginSuccess: false,
      })
    })
    .catch(err => {
      res.status(500).send();
    });
};


// Find a single User with an id
exports.findOne = (req, res) => {
  const { id } = req.body;

  User.findByPk(id)
    .then(data => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// find all published User
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
