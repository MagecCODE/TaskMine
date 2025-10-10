module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        title: {
            type: Sequelize.STRING,
        },
        task: {
            type: Sequelize.STRING,
        },
        priority: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
            maxValue: 3,
            minValue: 1
        },
        status: {       
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }); 
    return Task;
};