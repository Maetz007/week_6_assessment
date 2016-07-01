var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.listen(process.env.PORT || 4242, function()
    {console.log("4242- it's the answer to everything, TWICE!!");}
); // end app.listen

app.get('/', function(req, res){
  console.log('You Are in L');
  res.sendFile( path.resolve ('views/index.html') );
}); // end URL app.get

app.use(express.static('public'));

app.use(bodyParser.json());

mongoose.connect('localhost:27017/Heroes');

var heroSchema = new mongoose.Schema({
  hero_alias: String,
  hero_firstName: String,
  hero_lastName: String,
  hero_city: String,
  hero_power: String
}); // end heroSchema

var Hero = mongoose.model('Heroe', heroSchema);

app.post('/heroAdded', function(req,res){

  var newHero = new Hero({
    hero_alias: req.body.hero_alias,
    hero_firstName: req.body.hero_firstName,
    hero_lastName: req.body.hero_lastName,
    hero_city: req.body.hero_city,
    hero_power: req.body.hero_power
  }); // end new hero

  newHero.save(function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      console.log('Hero has been save, how ironic!');
      res.sendStatus(200);
    } // end else
  }); // end newHero.save
}); // end heroAdded

app.get( '/getHeroes', function(req, res){
  Hero.find().then(function(data){
  res.send(data);
}); // end Hero.find
}); // end app.get getHeroes

app.post('/heroRemove', function(req, res){
  var heroId = req.body.id;
  console.log("in app.delete = ", req.body.id);

  Hero.findOne({_id: heroId}, function(err, hero) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else {
      Hero.remove({_id: heroId}, function(err) {});
      console.log('Kryptonite has been applied.');
      res.sendStatus(200);
    } // end else
  }); // end Hero.findOne
});// end heroRemove
