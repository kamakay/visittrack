
var expect = require("chai").expect;
var request = require("request");



describe("Api Server", function() {

  describe("Alive", function() {

    var url = "http://localhost:3000/alive";

    it("returns status 200", function() {
       request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      }); 
    });

    it("returns OK message", function() {
       request(url, function(error, response, body) {
        expect(body).to.equal("OK");
        done();
      });
    });

  });

});

