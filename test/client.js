var expect = require("chai").expect;
var Q = require("q");
var Corvisa = require("../");

describe('Client', function() {

    it('should return a 4xx code', function() {
        var corvisa = new Corvisa("test");

        return corvisa.sendSMS("+15554447001", {
            to: "+14145554444",
            text: "Hello World"
        })
        .then(function() {
            throw "Hum, should fail";
        }, function(e) {
            expect(e.code).to.equal(401);
            return Q();
        });
    });

});
