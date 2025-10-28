# TaskMine
[![es](https://img.shields.io/badge/lang-es-yellow.svg)](https://github.com/MagecCODE/TaskMine/blob/main/README-spanish.md)

Welcome to TaskMine, an open-source, cross-platform app that’s simple and intuitive for managing daily tasks.

## Getting Started 🚀

You can clone the repository and start working in your IDE.

Check out **Postman** for testing the API endpoints—either way, further down in the documentation you’ll find a direct link to the endpoints.

### Prerequisites 📋

You need to install NodeJS, Sequelize, MySQL, Postman (or any other endpoint testing tool), and the Ionic Framework.

### Installing 🔧

From the terminal, once NodeJS is installed, run the following command to install the Ionic framework.

```
$ npm install -g @ionic/cli
```

When cloning the repository into your local directory, you need to consider the environment variables for setting up the database. In the repository, there's a file named .env.example. Follow these steps:

* 1- Make a copy of the file and rename it to .env, since the original is listed in the .gitignore file
* 2- Inside, you'll find the environment variables, which are linked to the db_config.js file located in the config folder of the backend. Replace the values with those specific to your development environment and database manager.
* 3- In the terminal, navigate to the general /backend directory and run the following command to install the necessary package for interpreting environment variables and .env files:
```
$ npm install dotenv
```
* 4- - Finally, if cloning the repository causes any issues and the database doesn't work with the environment variables after following these steps, check that the db_config.js file includes the dotenv requirement. If it doesn't, add the following line at the top of the file:
```
 require('dotenv').config();
 ```

## Running API Tests with Postman ⚙️

From the provided link, you can access the various API endpoints to run your tests. Don’t forget to install a database manager like MySQL or MySQL WorkBench.

* [Postman](https://documenter.getpostman.com/view/31873963/2sB3QMK8Z9) - Para probar los endpoints directamente

## Built With 🛠️

TaskMine is built with the following technologies.

* **FrontEnd:**

* [Ionic](https://ionicframework.com/) - Mobile framework for the Web.
* [TypeScript](https://www.typescriptlang.org/) - Typed to JavaScript.
* [Angular](https://angular.dev/) - Framework for Web scalability.
* [Sass](https://sass-lang.com/) - CSS extension for styling the app.

* **BackEnd:**

* [NodeJs](https://nodejs.org/es) - For executing JavaScript.
* [MySQL](https://www.mysql.com/) - Database management.
* [Sequelize](https://sequelize.org/) - ORM.

## Authors ✒️

TaskMine has been developed by a single author—me.

* **Samuel Alonso** - *Full-Stack Developer* - [S@Mu](https://github.com/MagecCODE) 

## License 📄

This project is licensed under the MIT License - - @MagecCODE -

## Acknowledgments

* Tell others about this project 📢
* Buy someone on the team a beer 🍺 or a coffee ☕ and think of me—or better yet, invite me too.
* Give public thanks 🤓 and don’t act foolish.
* Donate some crypto to this address: `0xf253fc233333078436d111175e5a76a649890000`
* etc.

---
⌨️ with ❤️ for [S@Mu](https://github.com/MagecCODE) 😊