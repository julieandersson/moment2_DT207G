// Inkluderar postgre
const { Client } = require("pg");
// Inkluderar express
const express = require("express");
const app = express();

// Inkluderar cors för att tillåta alla domäner
const cors = require("cors");
// Använder cors
app.use(cors());

const port = process.env.DB_PORT || 3000;

// Hämtar in variabler från env-fil
require('dotenv').config();
// Använder middleware för att automatiskt konvertera till json
app.use(express.json());

// Anslut till databasen
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    }
});

client.connect((err) => {
    if(err) {
        console.log("Anslutning misslyckades." + err);
    } else {
        console.log("Anslutningen lyckades.");
    }
});


// Startar applikation
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});