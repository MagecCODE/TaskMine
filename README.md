# TaskMine 
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/MagecCODE/TaskMine/blob/main/README-english.md)

Bienvenid@ a TaskMine, es una app multiplataformas de código abierto, sencilla e intuitiva para el manejo de tareas diarias.

## Comenzando 🚀

Puedes hacer un clonado del repositorio y comenzar a trabajar en tu IDE.

Mira **Postman** para las pruebas de los endpoint de la API, de todas formas mas abajo en la documentación tienes un enlace directo con los endpoints.

### Pre-requisitos 📋

Necesitas instalar NodeJS, Sequelize, MySQL, Postman (O cualquier otro programa de endpoints), Ionic Framework.

### Instalación 🔧

Desde la terminal una vez instalado NodeJs ejecutamos el siguiente comando para instalar el framekork de Ionic

```
$ npm install -g @ionic/cli
```
Al clonar el repositorio en el directorio local hay que tener en cuenta las variables de entorno para la instalación de la base de datos.
En el repositorio hay subido un archivo .env.ejemplo, haremos lo siguiente:

* 1- Hacer una copia del archivo y renombrarlo sencillamente a .env; debido a que el original está el archivo .gitignore 
* 2- Dentro estan las variables de entorno, que están vinculadas al archivo db_config.js en el backend, en la carpeta de config. Sustituimos los valores por los datos que tenngas en tu entorno de desarrollo y en tu gestor de base de datos.
* 3- En la terminal nos situaremos en el directorio del /backend general, y ejecutaremos el siguiente comando para instalar los paquete necesario para la interpretación d elas variables de entorno y de los archivos .env :
```
$ npm install dotenv
```
* 4- Por ultimo si en caso de al clonar el repositorio surgiera algun fallo y al hacer estos pasos no funcione la base de datos con las variables de entorno, coprueba que en el archivo db_config.js este el requerimiento del dotenv, sino es así copia este comando y ponlo al principio del archivo:
  
```
 require('dotenv').config();
 ```

## Ejecutando pruebas en API por Postman⚙️

Desde el enlace facilitado, puedes acceder a los diferentes endpoints de la api para hacer tus pruebas. Recuerda instalar un gestor de base de datos como MySQL o MySQL WorkBench

* [Postman](https://documenter.getpostman.com/view/31873963/2sB3QMK8Z9) - Para probar los endpoints directamente

## Construido con 🛠️

TaskMine esta contruido con las siguentes tecnologías.

* **FrontEnd:**

* [Ionic](https://ionicframework.com/) - Framework mobile para Web.
* [TypeScript](https://www.typescriptlang.org/) - Tipado a Javscript.
* [Angular](https://angular.dev/) - Framework para la escabilidad Web.
* [Sass](https://sass-lang.com/) - Extensión CSS para estilar la app.

* **BackEnd:**

* [NodeJs](https://nodejs.org/es) - Para la ejecución de JavaScript.
* [MySQL](https://www.mysql.com/) - Gestión de base de datos.
* [Sequelize](https://sequelize.org/) - ORM.

## Autores ✒️

TaskMine ha sido realizada por un solo autor,  yo.

* **Samuel Alonso** - *Desarrollador Full-Stack* - [S@Mu](https://github.com/MagecCODE) 

## Licencia 📄

Este proyecto está bajo la Licencia - @MagecCODE - 

## Expresiones de Gratitud 🎁

* Comenta a otros sobre este proyecto 📢
* Invita una cerveza 🍺 o un café ☕ a alguien del equipo y acuerdate de mi, o mejor invitame. 
* Da las gracias públicamente 🤓 y no hagas el cabra.
* Doname algunas criptos a esta dirección: `0xf253fc233333078436d111175e5a76a649890000`
* etc.



---
⌨️ con ❤️ por [S@Mu](https://github.com/MagecCODE) 😊
