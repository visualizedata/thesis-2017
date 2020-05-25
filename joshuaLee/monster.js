// Generates a file containing a list of monsters with one-word names

var fs = require('fs');
var LineByLineReader = require('line-by-line'); 
var lr = new LineByLineReader('lists/monster-list.txt');
var monsters = [];

lr.on('error', function (err) {
    // 'err' contains error object
});

lr.on('line', function (line) {
    var entry = new Object();
    
    if (line.split(' ').length == 1) {
        monsters.push(line);   
    }
});

lr.on('end', function () {
    
    var unique_monsters = monsters.filter(function(elem, index, self) {
        return index == self.indexOf(elem);
    });
    
    fs.writeFileSync('lists/single-name-monsters.json', JSON.stringify(unique_monsters));
});



