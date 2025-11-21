module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        
        name: {
            type: Sequelize.STRING,
            allowNull: true

        },
        username: {
            type: Sequelize.STRING,
            allowNull: false

        },  
        password: {
            type: Sequelize.STRING,
            allowNull: false

        },
        email: {
            type: Sequelize.STRING,
            allowNull: true

        },  
        filename:{
            type: Sequelize.STRING,
        }            
    });
    return User;
};