// index.js
// where your node app starts

// init project
var express = require('express');
var request = require('request');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});





// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function(req,res){
  var now = new Date();
  res.json({"unix": Number(now), "utc":now.toUTCString()})
})

app.get("/api/:date",function(req,res){
  var rawDate = req.params.date;
  if (Number(rawDate)==rawDate){
  const dateConverted = new Date(Number(rawDate));
  res.json({"unix": Number(rawDate), "utc":dateConverted.toUTCString()})}
  else if(!isNaN(Date.parse(rawDate))) {
  var date = new Date(rawDate);
  res.json({"unix": Number(date), "utc":date.toUTCString()});} 
  else res.json(({ error : "Invalid Date" }));
  res.end;
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
