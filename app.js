const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const connection = require(__dirname + "/connection.js");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));



//Connect to Database
connection.connectToDB();

const articlesSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = new mongoose.model("Article", articlesSchema);

//////////////////////// REQUEST TARGET ALL ARTICLES //////////////////////////
app.route("/articles")
    .get( function (req, res) {
        Article.find(function (err, foundArticles) {
            console.log(foundArticles);
            if (foundArticles) {
                res.send(foundArticles);
            } else {
                res.send("Error: " + err)
            }

        });
    })
    .post(function (req, res) {
        console.log(req.body);
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });

        newArticle.save(function (err) {
            if (!err) {
                res.send("Successfully added a new article!");
            } else {
                console.log(err);
            }

        });

    })
    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send("Successfully deleted all articles");

            } else {
                res.send(err);
            }
        });
    });

//////////////////////// REQUEST TARGET SPECIFIC ARTICLES //////////////////////////

app.route("/articles/:title")
    .get(function(req,res){
        
        Article.find({title : requestedTitle}, function(err, foundArticle){

            if(foundArticle){
                res.send(foundArticle);
            }
            else{
                res.send("There's no match found!")
            }
        })
    })

    .put(function(req , res){
        Article.findOneAndUpdate(
            { title: req.params.title},
            {title: req.body.title , content: req.body.content},
            {overwrite: true},
            function(err){
                if(!err){
                    res.send("Successfuly updated the article")
                }else{
                    res.send(err);
                }
            }
        )
    })

    .patch(function(req, res) {
        Article.updateOne(
            {title: req.params.title},
            {$set: req.body},
            function(err){
                if(!err){
                    res.send("Article successfully updated!")
                }else{
                    res.send(err);
                }
            }
        )
    })

    .delete(function(req,res){
        Article.deleteOne(
            {title: req.params.title},
            function(err){
                if(!err){
                    res.send("Article deleted successfully!");
                }else{
                    res.send(err)
                }
            }
        )
    })

//////////////////////////////////////////////////////////////////////
app.listen(3000, function () {
    console.log("Server started on port 3000");
});