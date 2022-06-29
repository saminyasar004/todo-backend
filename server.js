/**
 * Title: Server Setup
 * Description: HTTP Server related code
 * Author: Samin Yasar
 * Date: 28/June/2022
 */

// Dependencies
const http = require("http");
require("dotenv").config();

const app = require("./src/app/app");
const db = require("./src/db/db");

// Module scaffolding
const server = http.createServer(app);

const PORT = process.env.NODE_ENV === "production" ? 4000 : 3000;
const CONNECTION_STRING = `${process.env.CONNECTION_URI}/${process.env.DATABASE_NAME}`;

// Connect the database
db.connect(CONNECTION_STRING)
    .then(() => {
        console.log("Database connected.");
        // Listen the server
        server.listen(PORT, (err) => {
            if (!err) {
                console.log(`Server is running on port:${PORT}.`);
            } else {
                console.log("Error occures while running the server.");
                console.log(err.message);
            }
        });
    })
    .catch((err) => {
        console.log(err.message);
    });
