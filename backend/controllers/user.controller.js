const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;
const utils = require("../auth/utils");
const  bcrypt  =  require('bcryptjs');

// Create and Save a new User
exports.create = (req, res) => {
  //Validate request
  if (!req.body.password || !req.body.username) {
      return res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  let user = {    
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email : req.body.email
  };
  console.log("Usuario desde el controlador:",user);
  User.findOne({ where: { username: user.username } })
    .then(data => {
      if (data) {
        // User found, check password
        const result = bcrypt.compareSync(user.password, data.password);
        if (!result) return res.status(401).send('Password not valid!');
        // Passwords match, generate token
        const token = utils.generateToken(data);
        // get basic user details
        const userObj = utils.getCleanUser(data);
        // return the token along with user details
        return res.json({ user: userObj, access_token: token });
      };
      user.password = bcrypt.hashSync(req.body.password);
      // User not found. Save new User in the database
      User.create(user)
        .then(data => {
          const token = utils.generateToken(data);
          // get basic user details
          const userObj = utils.getCleanUser(data);
          // return the token along with user details
          return res.json({ user: userObj, access_token: token });
        })
        .catch(err => {
          return res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        });
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  User.findAll()
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      return res.send(data);
    })
    .catch(err => {
      return res.status(500).send({
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

// Find user by username and password
exports.findUserByUsernameAndPassword = (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  User.findOne({ where: { username: user, password: pwd } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};