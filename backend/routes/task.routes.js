module.exports = app => {
    const tasks = require("../controllers/task.controller.js");
    const auth = require("../auth/auth.js"); 
    const router = require("express").Router();

    // Create a new Task
    router.post("/", auth.isAuthenticated, tasks.create);
    // Retrieve all Tasks
    router.get("/", auth.isAuthenticated, tasks.findAll);
    // Retrieve a single Task with id
    router.get("/:id", auth.isAuthenticated, tasks.findOne);
    // Update a Task with id
    router.put("/:id", auth.isAuthenticated, tasks.update);
    // Update a Task whith id and status
    router.put("/:id/status", auth.isAuthenticated, tasks.updateStatus);
    // Delete a Task with id
    router.delete("/:id", auth.isAuthenticated, tasks.delete);
    // Delete all Tasks
    router.delete("/", auth.isAuthenticated, tasks.deleteAll);

    app.use('/api/tasks', router);
};