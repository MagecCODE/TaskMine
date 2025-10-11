module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        title: {
            type: Sequelize.STRING,
        },
        task: {
            type: Sequelize.STRING,
        },
        priority: {
            type: Sequelize.ENUM("Importante", "Normal", "No importante"),
            defaultValue: "Normal"
        },
        status: {       
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }); 
    return Task;
};