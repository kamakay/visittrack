var expect = require("chai").expect;
var app = require('../app');
var request = require("request");
var http = require('http');

var server;
app.set('port', process.env.PORT);

before(function(done){
   server = http.createServer(app);
   server.listen(process.env.PORT, process.env.IP, done);
});

after(function(){
    server.close();
    console.log('server closed')
});


describe("API features", function() {
    
  describe("Alive Route", function() {

    var url = "http://" + process.env.IP +":" + process.env.PORT+"/alive";

    it("returns status 200", function(done) {
       request(url, {method: 'GET' }, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns OK message", function(done) {
       request(url, {method: 'GET' }, function(error, response, body) {
        expect(body).to.contains("OK");
        done();
      });
    });

  });
  
  describe("Image content", function(){
      
      var url = "http://" + process.env.IP +":" + process.env.PORT+"/picture/pic.gif";
      var jarro = request.jar();
      
      it("return a gif image", function(done) {
          request(url, function(error, response, body) {
              console.log(JSON.stringify(response.headers));
              expect(response.headers['content-type']).to.equal("image/gif");
              expect(body).to.contains("GIF89a\u0001\u0000\u0001\u0000�\u0000\u0000���\u0000\u0000\u0000!�\u0004\u0001\u0000\u0000\u0000\u0000,\u0000\u0000\u0000\u0000\u0001\u0000\u0001\u0000\u0000\u0002\u0002D\u0001\u0000;");
            done();
        });
      });
      
      it("put a cookie when not present", function(done) {
          request({
                      uri: url,
                      method: 'GET',
                      jar: jarro
                  }
          , function(error, response, body) {
              var c = response.headers["set-cookie"];
              console.log();
              expect(c.P7).to.equal("7P=12345");
              
              done();
          });
      });
  });

});