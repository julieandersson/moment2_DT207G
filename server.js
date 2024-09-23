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

// Routes
app.get("/api", (req, res) => {
    res.json({message: "Välkommen till mitt API"});
});

// SQL-fråga, GET
app.get("/api/workexperience", (req, res) => {
    client.query(`SELECT * FROM workexperience;`, (err, results) => {
        // Felmeddelande vid hämtning av arbetserfarenheter
        if(err) {
            res.status(500).json({error: "Något gick fel: " + err});
            return;
        }

        // Om ingen data finns, skriv ut felmeddelande
        if(results.length === 0) {
            res.status(404).json({message: "Inga arbetserfarenheter hittades."});
        // Annars, skriv ut datan
        } else {
            res.json(results.rows);
        }
    });
    
});



// Startar applikation
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});