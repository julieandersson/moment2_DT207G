// Inkluderar postgre
const { Client } = require("pg");
//Inkluderar env-fil
require("dotenv").config();

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


// Skapar tabell
client.query(`
    DROP TABLE IF EXISTS workexperience;
    CREATE TABLE workexperience (
        id          SERIAL PRIMARY KEY,
        companyname TEXT NOT NULL,
        jobtitle    TEXT NOT NULL,
        location    TEXT NOT NULL,
        startdate   DATE NOT NULL,
        enddate     DATE,
        description TEXT NOT NULL,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
`);