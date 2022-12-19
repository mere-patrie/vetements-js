const express = require('express');
var cors = require('cors');
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/get_all_clothes/', (req, res) => {
    fs.readFile('vetements.json','utf8', function(err, data) {
        var clothes = JSON.parse(data)
        clothes.sort((a, b) => b.id - a.id);
        res.status(200).send(clothes);
    });
})

app.get('/one_clothe/', (req, res) => {
    var clothe_id = req.query.id;
    fs.readFile('vetements.json','utf8', function(err, data) {
        var clothes = JSON.parse(data);
        var clothe = clothes.filter(clothe => clothe.id == clothe_id);
        res.status(200).send(clothe);
    });
});

app.get('/outfit_products/', (req, res) => {
    var outfit_id = req.query.id;
    fs.readFile('vetements.json','utf8', function(err, data) {
        var clothes = JSON.parse(data);
        var clothe = clothes.filter(clothe => clothe.deOutfitNo == outfit_id);
        res.status(200).send(clothe);
    });
});

app.post('/new_clothe/', (req, res) => {
    fs.readFile('vetements.json','utf8', function(err, data) {
        var clothes = JSON.parse(data);
        clothes.sort((a, b) => a.id - b.id);
        if(clothes.length == 0){var id = 0;}else{var id = clothes[clothes.length - 1].id+1;};
        var saisons = ["Printemps", "Eté", "Automne", "Hiver"];
        var deOutfitNo = req.body.saison+"-"+req.body.from_outfit;
        clothes.push({id : id, nom : req.body.nom, type : req.body.type, saison : saisons[req.body.saison-1], marque : req.body.marque, deOutfitNo : deOutfitNo, prix : parseFloat(req.body.prix), img : req.body.image_url});
        fs.writeFile('vetements.json',JSON.stringify(clothes),function(err){});
    });
});

app.listen(8000, () => {
    console.log("Listening on http://localhost:8000")
})