'use strict';

const WebSocketServer = require('ws').Server;
const socket = new WebSocketServer({
    port: 8081,
    clientTracking: true
});
var ipAddr = '127.0.0.1';
var port = '8080';

var messageHandler = require('./messageHandler.js');
var updateHandler = require('./updateHandler.js');

const header = 'CAVER: ';

var n_users     = 0;
var onlineUsers = 0;
var max_users   = 0;

class Clients {
    constructor() {
        this.clientList = {};
        this.saveClient = this.saveClient.bind(this);
    }
    saveClient(username, client) {
        this.clientList[username] = client;
        this.clientList[username].identity = username;
        this.clientList[username].msgHandler = new messageHandler(client);
        this.clientList[username].updtHandler = new updateHandler(client); 
    }
}

const clients = new Clients();

socket.on('connection', function(client){
    var connected_user = ++n_users;
    onlineUsers++;
    
    clients.saveClient(connected_user, client);

    client.on('message', function(msg) {
        // console.log('msg(',client._socket.remoteAddress,'): ', msg);
        client.msgHandler.process(msg);
    });
    
    client.on('close', function() {
        console.log('Connection ended...');
        onlineUsers--;
    });
    
    // ws.send(header.concat('Hello Player!\nYou are player number ',n_users));
});

// Broadcast to all.
socket.broadcast = function broadcast(data) {
    socket.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

console.log('Listening on ', ipAddr,':',port);

socket.broadcast('hi all!');