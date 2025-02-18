const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Expose-Headers", "Content-Length");
    res.header(
        "Access-Control-Allow-Headers",
        "Accept, Origin, Authorization, Content-Type, X-Csrf-Token, X-Requested-With, Range, ut"
    );

    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

// Routes
const textRoute = require("./app/routes/route");
app.use("/api", textRoute);

module.exports = app;
