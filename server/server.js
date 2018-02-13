/*
Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Amazon Software License (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/asl/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.
*/
var faker = require('faker');
var moment = require('moment');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var Redis = require('ioredis');
var redis_address = 'redis://127.0.0.1:6379';


var redis = new Redis(redis_address);
var pub = new Redis(redis_address);
var redis_subscribers = {};
var channel_history_max = 10;

app.use(express.static('out/public'));
app.get('/health', function(request, response) {
    response.send('ok');
});

var clients =[];

app.get('/', function(req, res){
    res.sendFile(__dirname + '/out/public/index.html');
  });

io.on('connection', function(socket) {

    console.log("Connected.");
    clients.push(socket);

    socket.on('disconnect', function(){
        clients.splice(clients.indexOf(socket), 1);
        console.log('user disconnected');
    });

    socket.on('global', function(msg) {
        console.log("global recieved.");
        console.log("socket published: " + msg);
        pub.publish('global', msg);
    })
});

redis.subscribe('global', function(err, count) {
    console.log("subscribed to global");
});

redis.on('message', function (channel, message) {
    console.log("message buffer for: " + channel + " : " + message);

    pub.zadd('messages', moment.now(), message);

    var get_messages = pub.zrange('messages',  -5 /* history max */, -1).then(function(promise) {
        return promise;
    });

    Promise.all([get_messages]).then((values) => {
        console.log("values: " + values[0]);
    });

    console.log("message: " + get_messages);

    console.log("published: " + message);
    for(var i in clients) {
        console.log("publishing: " + i);
        var socket = clients[i];
        socket.emit('global', {message});
    }
});

http.listen(port, function() {
    console.log('Started server on port ' + port);
});