const db = require("../models");
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create and Save a new Task
exports.create = (req, res) => {

    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }   

    // Create a Task
    const task = {
        title: req.body.title,
        task: req.body.task,
        priority: req.body.priority,
        status: req.body.status
    };

    // Save Task in the database
    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        });
};

// Retrieve all Tasks from the database.
exports.findAll = (req, res) => {
    Task.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tasks."
            });
        }); 
};

// Find a single Task with an id
exports.findOne = (req, res) => {
};
// Update a Task by the id in the request
exports.update = (req, res) => {
};
// Delete a Task with the specified id in the request
exports.delete = (req, res) => {
};
// Delete all Tasks from the database.
exports.deleteAll = (req, res) => {
};