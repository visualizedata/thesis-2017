var express = require('express');
var cors = require('cors');
var req = require('request');
var app = express();
app.use(cors());
app.set('port', 8383);

//The public directory where all the static resources are served from
app.use(express.static('./'));

app.get("/dir/:from/:to",function(request,response){
  var directionsUrl = "https://maps.googleapis.com/maps/api/directions/json?departure_time=now&traffic_model=pessimistic&key=AIzaSyCHqZ-WXhO2VHhLsEyST7TF3XU0hFm2xRA&mode=driving";
  console.log(request.params.from+"-"+request.params.to);
  req({
    uri : directionsUrl+"&origin="+request.params.from+"&destination="+request.params.to,
    method : 'GET'
  },function(err,resp,body){
    response.send(body);
  }
  )
});

app.get("/places/:keyword",function(request,response){
  var placesUrl = "https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDF3fRoh8fxQpFFIoYtQWEvjzvCW_qh7KQ";
  console.log(request.params.keyword);
  req({
    uri : placesUrl+"&address="+request.params.keyword,
    method : 'GET'
  },function(err,resp,body){
    response.send(body);
  }
  )
});

//Starting the server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

