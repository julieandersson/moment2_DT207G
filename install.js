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
);
`, (err) => {
    if (err) {
        console.error("Fel vid skapande av tabell: ", err);
        client.end(); // Stänger vid fel
        return;
    }

// Lägger till lite data i databasen så att det finns data att testa i bl.a. thunderclient
    client.query(`
        INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description)
        VALUES 
        ('Mittuniversitetet', 'Labbhandledare', 'Sundsvall', '2019-01-01', '2019-12-31', 'Handledning av studenter i kursen DT057G'),
        ('Företag AB', 'Utvecklare', 'Stockholm', '2020-01-01', '2021-05-31', 'Utveckling av webbaserade applikationer'),
        ('Tech Solutions', 'Systemanalytiker', 'Göteborg', '2021-06-01', '2022-12-31', 'Analys av systemkrav och designlösningar'),
        ('Global Corp', 'Projektledare', 'Malmö', '2022-01-01', '2023-01-01', 'Ledning av projekt inom IT-sektorn'),
        ('Kreativ Studio', 'Grafisk Designer', 'Uppsala', '2018-03-01', '2020-08-31', 'Design av marknadsföringsmaterial och webbplatser'),
        ('Hälsovård AB', 'Sjukhusadministratör', 'Stockholm', '2021-03-01', NULL, 'Ansvarig för patientjournaler och schemaläggning')
        `, (err) => {
            if (err) {
                console.error("Fel vid inmatning av data: ", err);
            } else {
                console.log("Inmatning av data i tabellen lyckades.");
            }
            client.end(); // Stänger oavsett om det blev fel eller inte
        });
    });