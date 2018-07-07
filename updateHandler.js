// update handler 
// decouples the game from the server

// this file deals with providing output for the player

var ws = '';

module.exports = class updateHandler {
    constructor(client) {
        this.client = client;
    }

    process(message) {
        this.client.send(message);
    }
}