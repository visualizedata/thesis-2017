// Insert processed log file into database

var fs = require('fs');
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

var url = 'mongodb://' + process.env.IP + ':27017/';

var p1_data = JSON.parse(fs.readFileSync('logs/goof.json'));
var p2_data = JSON.parse(fs.readFileSync('logs/migu.json'));
var p3_data = JSON.parse(fs.readFileSync('logs/applied.json'));

var data = [p1_data, p2_data, p3_data];
var p = ['player_01', 'player_02', 'player_03'];

for (var i = 0; i < data.length; i++) {
    MongoClient.connect(url + p[i], function(err, db) {
        
        var index = Number(db.databaseName.split('0')[1]) - 1;
        
        if (err) { 
            return console.dir(err); 
        }
        
        var collection = db.collection(db.databaseName);
        collection.insert(data[index])
    
        db.close();
    
    });
}


// // insert single entry
// var fs = require('fs');
// var MongoClient = require('mongodb').MongoClient;
// var data = JSON.parse(fs.readFileSync('logs/applied.json'));
// var player = 'player_03';

// MongoClient.connect('mongodb://' + process.env.IP + ':27017/' + player, function(err, db) {
    
//     if (err) { 
//         return console.dir(err); 
//     }
    
//     var collection = db.collection(player);
//     collection.insert(data);

//     db.close();

// });
