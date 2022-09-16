const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors=require("cors")

app.use(cors());
app.use(express.json())

require("dotenv").config();

app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

app.listen(HTTP_PORT, () => {
    console.log("Ready to handle requests on port " + HTTP_PORT);
});

app.use((req, res) => {
    res.status(404).send("Resource not found");
  });