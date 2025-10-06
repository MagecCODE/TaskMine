// Imports
const express = require("express");
const cors = require("cors");

// Initialize app
const app = express();

// CORS
var corsOptions = {
    origin: "http://localhost:8100"
};          
app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database
const db = require ('./models');

// Normal use. Doesn't delete  database
// db.sequelize.sync();

// Use { force: true } to drop and re-create all tables each time the server starts.
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a TaskMine' });
});

require("./routes/task.routes")(app);

// Set Ports
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});