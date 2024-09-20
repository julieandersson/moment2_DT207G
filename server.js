// Inkluderar express
const express = require("express");
const app = express();
const port = process.env.DB_PORT || 3000;


// Startar applikation
app.listen(port, () => {
    console.log("Server startad på port: " + port);
});