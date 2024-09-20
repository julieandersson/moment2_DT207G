// Inkluderar express
const express = require("express");
// Inkluderar cors för att tillåta alla domäner
const cors = require("cors");

// Hämtar in variabler från env-fil
require('dotenv').config();

const app = express();
const port = process.env.DB_PORT || 3000;

// Använder cors
app.use(cors());
// Använder middleware för att automatiskt konvertera till json
app.use(express.json());


// Startar applikation
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});