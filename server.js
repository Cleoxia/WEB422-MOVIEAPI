/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: ______Wudi Xia______ Student ID: _108088154__ Date: __2022-09-15__
*  Cyclic Link: __https://mushy-seal-stockings.cyclic.app 
*
********************************************************************************/ 

const express = require("express");
const app = express();
app.use(express.json());

//may use after if read from form
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const path = require("path");
const HTTP_PORT = process.env.PORT||8080;

const cors=require("cors");
app.use(cors());
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

//enable the use of .env
require("dotenv").config();

//listen to 8080
db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

//homepage route/
app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

//post(add) new movie
app.post("/api/movies", (req,res) => {
    db.addNewMovie(req.body)
    .then(() => {
            res.status(201).json(`new movie ${req.body} added`);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

//get all movies
app.get("/api/movies", (req,res) => {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then(() => {
            res.status(200).json(`all movies in page ${req.query.page} listed`);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

//get movie by id
app.get("/api/movies/:id", (req,res) => {
    db.getMovieById(req.params.id)
    .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err) => {
            res.status(404).json(err);
        });
});

//put(change) movie document
app.put("/api/movies/:id",(req,res)=>{
    db.updateMovieById(req.body, req.params.id)
    .then(() => {
        res.status(201).json(`Movie ${req.params.id} Info changed`);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});

//delete movie
app.delete("/api/movies/:id",(req,res)=>{
    db.deleteMovieById(req.params.id)
    .then(() => {
        res.status(201).json(`Movie ${req.params.id} Deleted`);
    })
    .catch((err) => {
        res.status(400).json(err);
    });
});


//if extension not found
app.use((req, res) => {
    res.status(404).send("Resource not found");
  });


