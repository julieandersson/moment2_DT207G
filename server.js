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

// PUT-route - Uppdatera jobberfarenhet
app.put("/api/workexperience/:id", (req, res) => {
    // Hämta jobb-ID från URL-paramentern
    const jobId = req.params.id;
    // Hämta jobbdatan från req-body
    const jobData = req.body;

    // SQL-fråga för att uppdatera jobberfarenhet i databasen
    const updateQuery = `
        UPDATE workexperience 
        SET companyname = $1, jobtitle = $2, location = $3, startdate = $4, enddate = $5, description = $6 
        WHERE id = $7`;

    // Utför SQL-frågan med de angivna värdena
    client.query(updateQuery, [
        jobData.companyname,
        jobData.jobtitle,
        jobData.location,
        jobData.startdate,
        jobData.enddate,
        jobData.description,
        jobId
    ], (err, results) => {
        // Felhantering
        if (err) {
            return res.status(500).json({ error: "Något gick fel: " + err });
        }
        // Kontrollera om någon rad uppdaterades
        if (results.rowCount === 0) {
            // Om inget jobb hittas med det angivna ID:et
            return res.status(404).json({ message: "Inget jobb kunde hittas med ID: " + jobId });
        }

        //Om uppdateringen lyckas, skicka meddelande
        res.json({ message: "Jobb uppdaterat", jobId });
    });
});

// DELETE-route - Ta bort jobberfarenhet
app.delete("/api/workexperience/:id", (req, res) => {
    const jobId = req.params.id; // Hämta jobb-ID från URL-parameter

    // SQL-fråga för att ta bort jobbet
    client.query(`DELETE FROM workexperience WHERE id = $1`, [jobId], (err, results) => {
        // Kontrollera om det uppstod ett fel 
        if (err) {
            return res.status(500).json({ error: "Något blev fel: " + err });
        }
        // Kontrollera om jobbet hittades och togs bort
        if (results.rowCount === 0) {
            return res.status(404).json({ message: "Inget jobb hittades med ID: " + jobId });
        }
        // Om borttagningen lyckas, skicka meddelande
        res.json({ message: "Jobbet har tagits bort", jobId });
    });
});

// Startar applikation
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});