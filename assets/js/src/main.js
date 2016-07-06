var start    = require('./start');
var unique   = require('uniq');

//usando el paquete de npm
var data = [1, 2, 3, 4, 5, 5, 5, 6];
console.log(unique(data));

//usando nuestro archivo local
var y = start.a(3);
console.log('N: ' + y);