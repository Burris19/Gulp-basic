"use strict";

function first_test() {
    return "This is a test";
};

var firstTest = first_test();

if(firstTest == undefined) {
    
    var second_test = function() {
        
        return firstTest;
    };
};
var square = function (x) {
    return x * x;
};