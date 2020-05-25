// Require
var express = require('express');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;

// https://www.npmjs.com/package/freq
var freq = require('freq');

const _ = require("underscore");

// App and Server Stuff
var app = express();
var server = http.createServer(app);

// Mongo URL
var url = 'mongodb://' + process.env.IP + ':27017/';
// var env_url = process.env.MONGO_URL;
var env_url = '';

// Player List
var p = ['player_01', 'player_02', 'player_03'];

app.use(express.static('client'));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
    var addr = server.address();
    console.log(addr.address + ": " + addr.port)
  }
);

// Code References 

// collection.aggregate([
//     { $match : { $or : [ { money_spent : { $ne : false } }, { money_earned : { $ne : false } } ] } },
//     { $project : { _id : false, time: 1, money_spent : 1, money_earned : 1 } }
// ]);

// app.get('/whisper_to/:name', function (req, res) {
//   var name = req.params.name;
//   res.send(name);
// });


// =======
//  Money
// =======

// Mongo Aggregation
var money_pipeline = [
  { $match : { $or : [ { money_spent : { $ne : false } }, { money_earned : { $ne : false } } ] } },
  { $project : { _id : false, money_earned : 1, money_spent : 1 } }
];

// Reshape Aggregated Data
function money_data(d) {

  var earnings = [];
  var spendings = [];
  
  var earnings_total = 0;
  var spendings_total = 0;
  
  var earnings_transactions = 0;
  var spendings_transactions = 0;
  
  var earnings_highest_transaction = 0;
  var spendings_highest_transaction = 0;

  var earnings_lowest_transaction = 0;
  var spendings_lowest_transaction = 0;
  
  var money = {};
  
  for (var i = 0; i < d.length; i++) {
    if (d[i].money_earned != false) {
      earnings.push(d[i].money_earned);
      earnings_total += d[i].money_earned;
    }
    
    if (d[i].money_spent != false) {
      spendings.push(d[i].money_spent);
      spendings_total += d[i].money_spent;
    }
  }
  
  earnings = _.sortBy(earnings).reverse();
  spendings = _.sortBy(spendings).reverse();  
  
  earnings_transactions = earnings.length;
  spendings_transactions = spendings.length;
  
  earnings_highest_transaction = _.max(earnings);
  spendings_highest_transaction = _.max(spendings);
  
  earnings_lowest_transaction = _.min(earnings);
  spendings_lowest_transaction = _.min(spendings);
  
  money = {
    earnings: earnings,
    earnings_total: earnings_total,
    earnings_transactions: earnings_transactions,
    earnings_highest: earnings_highest_transaction,
    earnings_lowest: earnings_lowest_transaction,
    spendings: spendings,
    spendings_total: spendings_total,
    spendings_transactions: spendings_transactions,
    spendings_highest: spendings_highest_transaction,
    spendings_lowest: spendings_lowest_transaction    
  };
  
  return money;
}

// ==========
//  Messages
// ==========

// Mongo Aggregation
var messages_pipeline = [
  { $match : { $or : [ { whisper_to : { $ne : false } }, { whisper_from : { $ne : false } } ] } },
  { $group : { _id : { to : '$whisper_to', from : '$whisper_from' }, whisper_length : { $push : '$whisper_length' }, text : { $push : '$whisper_text' } } }
  // { $group : { _id : { to : '$whisper_to', from : '$whisper_from' }, whisper_length : { $push : '$whisper_length' }, text : { $push : '$whisper_text' }, raw : { $push : '$raw' } } }
  // { $project : { _id : false, whisper_to : 1, whisper_from : 1, whisper_length : 1, raw : 1 } }
  // { $group : { _id : { to : '$whisper_to', from : '$whisper_from' }, instances : { $push : { whisper_length : '$whisper_length', time : '$time' } } } },  
];

// Reshape Aggregated Data
function messages_data(d) {

  // console.log(d);
  
  var tos = [];
  var froms = [];
  
  var to_words = '';
  var from_words = '';
  
  var to_words_top = [];
  var from_words_top = [];
  
  console.log('player');
  
  // for (var i = 0; i < d.length; i++) {
    
  //   // if whisper to
  //   if (d[i]._id.to != false) {
      
  //     // container to hold all words
  //     var text = '';
  //     var top_words = [];
  //     var friend = {};
      
  //     // loop into the text list of the friend
  //     for (var k = 0; k < d[i].text.length; k++) {
  //       text += ' ' + d[i].text;
  //     }
      
  //     text = freq(text);
  //     text = _.sortBy(text, 'count').reverse();

  //     text[0] != undefined ? top_words[0] = text[0] : top_words[0] = { word: null, count: null };
  //     text[1] != undefined ? top_words[1] = text[1] : top_words[1] = { word: null, count: null };
  //     text[2] != undefined ? top_words[2] = text[2] : top_words[2] = { word: null, count: null };
      
  //     friend = {
  //       name: d[i]._id.to,
  //       length: d[i].whisper_length.reduce(add, 0),
  //       top_words: top_words
  //     };
      
  //     // WORK ON THIS
      
      
  //     // global top words
  //     to_words += d[i].text;
  //   }
    
  //   if (d[i]._id.from != false) {
  //     froms.push(d[i].whisper_from); 
  //     from_words += d[i].text;
  //   }
  // }


  // console.log(to_words);

  // console.log(tos);
  
  return d; 
}

// ==================
//  Damage Inflicted
// ==================

// Mongo Aggregation
var dmg_inflicted_pipeline = [
  { $match : { damage_inflicted : { $ne : false } } },
  { $group : 
    {
      _id : '$damage_skill', 
      dmg : { $sum : '$damage_inflicted' },  
      min : { $min : '$damage_inflicted' },
      max : { $max : '$damage_inflicted' },
      mean : { $avg : '$damage_inflicted' },
      crits : { $sum : '$damage_inflicted_critical' },
      count : { $sum : 1 }
    }
  }
];

// Reshape Aggregated Data
function dmg_inflicted_data(d) {
  d = _.sortBy(d, 'dmg').reverse();
  return d; 
}

// =================
//  Damage Received
// =================

// Mongo Aggregation
var dmg_received_pipeline = [
  { $match : { damage_received : { $ne : false } } },
  { $group : 
    {
      _id : '$damage_skill', 
      dmg : { $sum : '$damage_received' },  
      min : { $min : '$damage_received' },
      max : { $max : '$damage_received' },
      mean : { $avg : '$damage_received' },
      crits : { $sum : '$damage_received_critical' },
      count : { $sum : 1 }
    }
  }
];

// Reshape Aggregated Data
function dmg_received_data(d) {
  d = _.sortBy(d, 'dmg').reverse();
  return d; 
}

// ===============
//  Damage Totals
// ===============

// Mongo Aggregation
var dmg_totals_pipeline = [
  { $match : { $or : [ { damage_inflicted : { $ne : false } }, { damage_received : { $ne : false } } ] } },
  { $group : 
    { 
      _id : null, 
      inflicted_total : { $sum : '$damage_inflicted' },
      inflicted_count : { $sum : '$damage_inflicted_instance' },
      inflicted_crits : { $sum: '$damage_inflicted_critical' },
      received_total : { $sum : '$damage_received' },
      received_count : { $sum : '$damage_received_instance' },
      received_crits : { $sum: '$damage_received_critical' },    
    } 
  }
];

// Reshape Aggregated Data
function dmg_totals_data(d) {

  var totals = {
    inflicted: {
      total: d[0].inflicted_total,
      count: d[0].inflicted_count,
      crits: d[0].inflicted_crits,
    },
    received: {
      total: d[0].received_total,
      count: d[0].received_count,
      crits: d[0].received_crits,
    }
  }

  return totals;
}

// =============
//  Money Dates
// =============

// Mongo Aggregation
var money_dates_pipeline = [
  { $match : { $or : [ { money_spent : { $ne : false } }, { money_earned : { $ne : false } } ] } },
  { $project : { _id : false, time : 1, money_spent : 1, money_earned : 1 } }
];

// Reshape Aggregated Data
function money_dates_data(d) {
  
  var earnings = [0, 0, 0, 0, 0, 0, 0];
  var spendings = [0, 0, 0, 0, 0, 0, 0];

  var earned_highest = 0;
  var spent_highest = 0;

  var earned_total = 0;
  var spent_total = 0;
  
  var day_earned_most = 0;
  var day_spent_most = 0;
  
  var earned_transactions = [0, 0, 0, 0, 0, 0, 0];
  var spent_transactions = [0, 0, 0, 0, 0, 0, 0];
  
  var earned_total_transactions = 0;
  var spent_total_transactions = 0;

  var money_dates = {};

  for (var i = 0; i < d.length; i++) {
    
    // if earned
    if (d[i].money_earned != false) {
      var day = new Date(Date.parse(d[i].time)).getDay();
      earnings[day] += d[i].money_earned;
      earned_total += d[i].money_earned;
      earned_transactions[day]++;
      earned_total_transactions++;
    }
    
    // if spent
    if (d[i].money_spent != false) {
      var day = new Date(Date.parse(d[i].time)).getDay();
      spendings[day] += d[i].money_spent;
      spent_total += d[i].money_spent;
      spent_transactions[day]++;
      spent_total_transactions++;      
    }  
  }
  
  // get highest
  for (i = 0; i < earnings.length; i++) {
    // highest earned/spent
    if (earned_highest < earnings[i]) {
      earned_highest = earnings[i];
      day_earned_most = i;
    }
    
    if (spent_highest < spendings[i]) {
      spent_highest = spendings[i];
      day_spent_most = i;
    }
  }
  
  money_dates = {
    earnings: earnings,
    earned_highest: earned_highest,
    earned_total: earned_total,
    day_earned_most: day_earned_most,
    earned_transactions: earned_transactions,
    earned_total_transactions: earned_total_transactions,
    spendings: spendings,
    spent_highest: spent_highest,
    spent_total: spent_total,
    day_spent_most: day_spent_most,
    spent_transactions: spent_transactions,
    spent_total_transactions: spent_total_transactions
  }

  return money_dates; 
}

// ================
//  Messages Dates
// ================

// Mongo Aggregation
var messages_dates_pipeline = [
  { $match : { $or : [ { whisper_to : { $ne : false } }, { whisper_from : { $ne : false } } ] } },
  { $project : { _id : false, time : 1, whisper_to : 1, whisper_from : 1, whisper_length : 1 } }
];

// Reshape Aggregated Data
function messages_dates_data(d) {
  
  var tos = [0, 0, 0, 0, 0, 0, 0];
  var froms = [0, 0, 0, 0, 0, 0, 0];
  
  var tos_total = 0;
  var froms_total = 0;
  
  var tos_instances = [0, 0, 0, 0, 0, 0, 0];
  var froms_instances = [0, 0, 0, 0, 0, 0, 0];
  
  var tos_total_instances = 0;
  var froms_total_instances = 0;
  
  var tos_highest = 0;
  var froms_highest = 0;
  
  var day_tos_most = 0;
  var day_froms_most = 0;
  
  var messages_dates = {};
  
  for (var i = 0; i < d.length; i++) {
    
    // if earned
    if (d[i].whisper_to != false) {
      var day = new Date(Date.parse(d[i].time)).getDay();
      tos[day] += d[i].whisper_length;
      tos_total += d[i].whisper_length;
      tos_instances[day]++;
      tos_total_instances++;
    }
    
    // if spent
    if (d[i].whisper_from != false) {
      var day = new Date(Date.parse(d[i].time)).getDay();
      froms[day] += d[i].whisper_length;
      froms_total += d[i].whisper_length;
      froms_instances[day]++;
      froms_total_instances++;      
    }  
  }
  
  // get highest
  for (var i = 0; i < tos.length; i++) {
    // highest earned/spent
    if (tos_highest < tos[i]) {
      tos_highest = tos[i];
      day_tos_most = i;
    }
    
    if (froms_highest < froms[i]) {
      froms_highest = froms[i];
      day_froms_most = i;
    }
  }
  
  messages_dates = {
    tos: tos,
    tos_highest: tos_highest,
    tos_total: tos_total,
    day_tos_most: day_tos_most,
    tos_instances: tos_instances,
    tos_total_instances: tos_total_instances,
    
    froms: froms,
    froms_highest: froms_highest,
    froms_total: froms_total,
    day_froms_most: day_froms_most,
    froms_instances: froms_instances,
    froms_total_instance: froms_total_instances
  }

  return messages_dates; 
  
}

// ================
//  Damage Dates
// ================

// Mongo Aggregation
var damage_dates_pipeline = [
  { $match : { $or : [ { damage_inflicted : { $ne : false } }, { damage_received : { $ne : false } } ] } },
  { $project : { _id : false, time : 1, damage_inflicted : 1, damage_received : 1 } }
];

// Reshape Aggregated Data
function damage_dates_data(d) {
  
  var inflicts = [0, 0, 0, 0, 0, 0, 0];
  var receives = [0, 0, 0, 0, 0, 0, 0];
  
  var inflicted_total = 0;
  var received_total = 0;
  
  var inflicted_instances = [0, 0, 0, 0, 0, 0, 0];
  var received_instances = [0, 0, 0, 0, 0, 0, 0];
  
  var inflicted_total_instances = 0;
  var received_total_instances = 0;
  
  var inflicted_highest = 0;
  var received_highest = 0;
  
  var day_inflicted_most = 0;
  var day_received_most = 0;
  
  var damage_dates = {};

  for (var i = 0; i < d.length; i++) {
    
    // if earned
    if (d[i].inflicted != false) {
      var day = new Date(Date.parse(d[i].time)).getDay();
      inflicts[day] += d[i].damage_inflicted;
      inflicted_total += d[i].damage_inflicted;
      inflicted_instances[day]++;
      inflicted_total_instances++;
    }
    
    // if spent
    if (d[i].whisper_from != false) {
      var day = new Date(Date.parse(d[i].time)).getDay();
      receives[day] += d[i].damage_received;
      received_total += d[i].damage_received;
      received_instances[day]++;
      received_total_instances++;      
    }  
  }
  
  // get highest
  for (var i = 0; i < inflicts.length; i++) {
    // highest earned/spent
    if (inflicted_highest < inflicts[i]) {
      inflicted_highest = inflicts[i];
      day_inflicted_most = i;
    }
    
    if (received_highest < receives[i]) {
      received_highest = receives[i];
      day_received_most = i;
    }
  }
  
  damage_dates = {
    
    inflicts: inflicts,
    inflicted_highest: inflicted_highest,
    inflicted_total: inflicted_total,
    day_inflicted_most: day_inflicted_most,
    inflicted_instances: inflicted_instances,
    inflicted_total_instances: inflicted_total_instances,
    
    receives: receives,
    received_highest: received_highest,
    received_total: received_total,
    day_received_most: day_received_most,
    received_instances: received_instances,
    received_total_instances: received_total_instances
  }

  return damage_dates; 
}

function damage_pipeline() {
  // { $match : { $or : [ { damage_inflicted : { $ne : false } }, { damage_received : { $ne : false } } ] } },
  // { $project : { _id : false, damage_inflicted : 1, damage_received : 1, damage_skill : 1,  damage_critical : 1 } }
}

function damage_data(d) {
  
  // var inflicted = [];
  // var received = [];

  // for (var i = 0; i < d.length; i++) {
  //   if (d[i].damage_inflicted != false) {
  //     inflicted.push(d[i].damage_inflicted);
      
  //   }
  //   if (d[i].damage_received != false) {
  //     inflicted.push(d[i].damage_received);
  //   }
  // } 

  return d;  
}

      // _id : '$damage_skill', 
      // dmg : { $sum : '$damage_received' },  
      // min : { $min : '$damage_received' },
      // max : { $max : '$damage_received' },
      // mean : { $avg : '$damage_received' },
      // crits : { $sum : '$damage_received_critical' },
      // count : { $sum : 1 }


// Lookup Tables
// They perform faster than switch and if-else statements
// https://jsperf.com/if-switch-lookup-table/10
// Usage: reshape[req.url](d)

// Aggregation Pipeline
var pipeline = {
  '/money': function() { return money_pipeline; },
  '/messages': function() { return messages_pipeline; },
  '/dmg_inflicted': function() { return dmg_inflicted_pipeline; },
  '/dmg_received': function() { return dmg_received_pipeline; },
  '/dmg_totals': function() { return dmg_totals_pipeline; },
  '/money_dates': function() { return money_dates_pipeline; },
  '/messages_dates': function() { return messages_dates_pipeline; },
  '/damage_dates': function() { return damage_dates_pipeline; },
  '/damage': function() { return damage_pipeline; }
};

// Reshape the Data
var reshape = {
  '/money': function(d) { return money_data(d); },
  '/messages': function(d) { return messages_data(d); },
  '/dmg_inflicted': function(d) { return dmg_inflicted_data(d); },
  '/dmg_received': function(d) { return dmg_received_data(d); },
  '/dmg_totals': function(d) { return dmg_totals_data(d); },
  '/money_dates': function(d) { return money_dates_data(d); },
  '/messages_dates': function(d) { return messages_dates_data(d); },
  '/damage_dates': function(d) { return damage_dates_data(d); },
  '/damage': function(d) { return damage_data(); }
};

// Assign Get Method
app.get('/money', callback);
app.get('/messages', callback);
app.get('/dmg_inflicted', callback);
app.get('/dmg_received', callback);
app.get('/dmg_totals', callback);
app.get('/money_dates', callback);
app.get('/messages_dates', callback);
app.get('/damage_dates', callback);
app.get('/damage', callback);

// // Mongodb.net callback
// function callback(req, res) {
  
//   // res data holder
//   var res_data = [];
//   var conns = 0;

//   // single connection
    
//   // break this down into three separate connections.
  
//   // player_01
//   MongoClient.connect(env_url, function(e, db) {
//     console.log('conneting player 1')
// 		db.collection(p[0]).aggregate(pipeline[req.url]()).toArray(function(e, d) {
// 		  res_data[0] = reshape[req.url](d);
// 	    conns++;
// 	    if (conns == p.length) {
// 	      db.close();
// 	      res.json(res_data);
// 	    }
// 		});
//   }) // end mongo connect

//   // player_02
//   MongoClient.connect(env_url, function(e, db) {
//     console.log('conneting player 2')    
// 		db.collection(p[1]).aggregate(pipeline[req.url]()).toArray(function(e, d) {
// 		  res_data[1] = reshape[req.url](d);
// 	    conns++;
// 	    if (conns == p.length) {
// 	      db.close();
// 	      res.json(res_data);
// 	    }
// 		});
//   }) // end mongo connect
  
//   // player_03
//   MongoClient.connect(env_url, function(e, db) {
//     console.log('conneting player 3')    
// 		db.collection(p[2]).aggregate(pipeline[req.url]()).toArray(function(e, d) {
// 		  res_data[2] = reshape[req.url](d);
// 	    conns++;
// 	    if (conns == p.length) {
// 	      db.close();
// 	      res.json(res_data);
// 	    }
// 		});
//   }) // end mongo connect
  
// } // end callback

function callback(req, res) {
  var res_data = [];
  var conns = 0;
  for (var i = 0; i < p.length; i++) {
    MongoClient.connect(url + p[i], function(e, db) {
      var index = Number(db.databaseName.split('0')[1]) - 1;
      db.collection(p[index]).aggregate(pipeline[req.url]()).toArray(function(e, d) {
        res_data[index] = reshape[req.url](d);
        db.close();
        conns++;
        check(conns, res, res_data);
      });
    });  
  }
}

// if number of connections to mongo db is 3 (number of players) send stuff over
function check(conns, res, res_data) {
  if (conns == p.length) {
    res.json(res_data);
  }
}

var sum = [1, 2, 3].reduce(add, 0);

function add(a, b) {
    return a + b;
}
