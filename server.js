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

// GET-route - Hämtar arbetserfarenheter
app.get("/api/workexperience", (req, res) => {
    client.query(`SELECT * FROM workexperience;`, (err, results) => {
        // Felmeddelande vid hämtning av arbetserfarenheter
        if(err) {
            res.status(500).json({error: "Något gick fel: " + err});
            return;
        }

        // Om ingen data finns, skriv ut felmeddelande
        if(results.rows.length === 0) {
            res.status(404).json({message: "Inga arbetserfarenheter hittades."});
        // Annars, skriv ut datan
        } else {
            res.json(results.rows);
        }
    });
    
});

// POST-route - Lägger till ny arbetserfarenhet
app.post("/api/workexperience", (req, res) => {
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;
    let description = req.body.description;

    // Errors
    let errors = {
        message: "",
        detail: "",
        https_response: {

        }
    };

    if(!companyname || !jobtitle || !location || !startdate || !enddate || !description) {
        // Felmeddelande vid error
        errors.message = "Samtliga uppgifter är inte inkluderade";
        errors.detail = "Du måste ange alla uppgifter";

        //Respons
        errors.https_response.message = "Felaktig förfrågan";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        return; // Stoppa om det blir fel
    }

    // Lägg till nytt jobb (arbetserfarenhet)
    client.query(`INSERT INTO workexperience(companyname, jobtitle, location, startdate, enddate, description) VALUES($1, $2, $3, $4, $5, $6);`, [companyname, jobtitle, location, startdate, enddate, description], (err, results) => {
        // Om något fel uppstår
        if(err) {
            res.status(500).json({error: "Något gick fel: " + err});
            return;
    }
    
        // Om inget fel och query lyckas så skapas objekt
        let job = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    };
        // Meddelande när jobb har lagts till
        res.json({message: "Jobb har lagts till", job});
    }); 
});

// Startar applikation
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});