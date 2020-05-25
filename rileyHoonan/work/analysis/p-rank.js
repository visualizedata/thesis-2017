var request = require('request');
var fs = require('fs');
var d3 = require('d3');

// data cannot include points that have not been scraped yet
// var dataIn_1 = JSON.parse(fs.readFileSync('data/prototype-mapsFrom.json'));
// var dataIn_2 = JSON.parse(fs.readFileSync('data/prototype-mapsTo.json'));

var totalURLs = 1512, //this was updated from 1591, for the old set
    initRank = 1/totalURLs,
    args = {},
    duplicates = [],
    fullSet = [];

// the PageRank conferred by an outbound link is equal to the document's own PageRank score divided by the number of outbound links L( )
// restructure for easy reference / less lookups in calculations
function parameters(data) {

  for (var i in data) {

      if (!args.hasOwnProperty(data[i].url)) {
        args[data[i].url] = {};
      } else {
        duplicates.push(data[i].url);
      }

      if (data[i].hasOwnProperty('mapsTo')) {
        args[data[i].url].mapsToLen = data[i].mapsTo.length;
        if (data[i].mapsTo.length==0) {
          args[data[i].url].mapsToLen = 1;
        }
      } else {
        args[data[i].url].mapsToLen = 1;
      }

      if (data[i].hasOwnProperty('mapsFrom')) {
        args[data[i].url].mapsFrom = data[i].mapsFrom;
      } else {
        args[data[i].url].mapsFrom = [];
      }

      //initialize rankings
      args[data[i].url].rank = initRank;
      //add distance
      args[data[i].url].distance = data[i].distance;

  }
}

function rankings(iteration) {

  fullSet[iteration] = {};

  for (var url in args) {
    if (args.hasOwnProperty(url)) {

      // seperate output space from input space
      fullSet[iteration][url] = args[url].rank;
      // calculate rank and assign to output space
      for (var j in args[url].mapsFrom) {
        var mfurl = args[url].mapsFrom[j];

        if (iteration==0) {
          // initial values
          fullSet[iteration][url] += (1/args[mfurl].distance)*(args[mfurl].rank/args[mfurl].mapsToLen);
        } else {
          // using previous
          fullSet[iteration][url] += (fullSet[iteration-1][url]/args[mfurl].mapsToLen);
        }
      }

      //set to six decimal places
      fullSet[iteration][url] = fullSet[iteration][url].toFixed(6);

    }
  }

}

var topQuartile = {};
// build ranking stats per iteration
function rankStats(iteration) {

    console.log('ITERATION: '+iteration)
    var justRanksFull = [];
    for (var url in fullSet[iteration]) {
      justRanksFull.push(fullSet[iteration][url]);
    }

    //sort justRanksFull
    justRanksFull = justRanksFull.sort();
    // console.log(justRanksFull)

    //set rank cutOff to the 25% quartile of initial scrape
    var cutOff = d3.quantile(justRanksFull, 0.75); // 0.008114;
    var justRanksLean = [];

    for (var url in fullSet[iteration]) {
      if (fullSet[iteration][url] > cutOff) {
        topQuartile[url] = fullSet[iteration][url];
        justRanksLean.push(fullSet[iteration][url]);
      }
    }

    console.log('full url count:'+justRanksFull.length);
    console.log('singular rank (1 link): '+initRank+'\n');

    console.log('FULL MAX: '+d3.max(justRanksFull));
    console.log('FULL MIN: '+d3.min(justRanksFull));
    console.log('FULL MEAN: '+d3.mean(justRanksFull));
    console.log('FULL MEDIAN: '+d3.median(justRanksFull));

    console.log('cutoff: '+cutOff);
    console.log('lean url count:'+justRanksLean.length);

    console.log('LEAN MAX: '+d3.max(justRanksLean));
    console.log('LEAN MIN: '+d3.min(justRanksLean));
    console.log('LEAN MEAN: '+d3.mean(justRanksLean));
    console.log('LEAN MEDIAN: '+d3.median(justRanksLean));

    console.log('Duplicates: '+duplicates.length);

}

module.exports = {

  ranks: function(data1, data2) {

    parameters(data1); //dataIn_1
    parameters(data2);  //dataIn_2
    // call rankings function
    rankings(0);
    rankStats(0);

    return [fullSet,topQuartile];
  }

}
