module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
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

    Task.associate = models =>{
        Task.belongsTo(models.user,{
            onDelete: "CASCADE",
            foreingKey: "id",
            as: "users",
        });
    };
    return Task;
};