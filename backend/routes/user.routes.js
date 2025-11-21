module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const auth = require("../auth/auth.js");  
    let router = require("express").Router();
    let upload = require('../multer/upload.js');

    // Create a new User
    router.post("/", upload.single('file'), users.create);  
    // Retrieve all User
    router.get("/", auth.isAuthenticated, users.findAll);    
    // Retrieve a single User with id
    router.get("/:id", auth.isAuthenticated, users.findOne);  
    // Update a User with id
    router.put("/:id", auth.isAuthenticated, users.update);
    // Update image
    router.put("/:id/photo", auth.isAuthenticated, upload.single('file'), users.updatePhoto);

    // Sign in
    router.post("/signin", auth.signin);    
        
    app.use('/api/users', router);
};