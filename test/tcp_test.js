'use strict'

var expect = require('chai').expect;
var fs = require('fs');
var net = require('net');
var server = require(__dirname + '/../tcp_server.js');

var filesCountBefore, filesCountAfter;

describe('a tcp server request', function() {

  before(function(done){
    filesCountBefore = fs.readdirSync(__dirname + '/../files/').length;
    var client = net.createConnection({port: 3000});
    client.on('connect', function() {
      client.write('test', function(){
        client.end();
      });
    });
    client.on('end', function() {
      done();
    });
  });

  it('should write a new file when requested', function() {
    filesCountAfter = fs.readdirSync(__dirname + '/../files/').length;
    expect(filesCountBefore).to.eql(filesCountAfter - 1);
  });
});
