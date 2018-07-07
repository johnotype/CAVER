// message handler
// decouple the server from the game

// this file deals with reading the input from the player

var gameFunctions = require('./gameFunctions.js')

module.exports = class messageHandler {

    constructor(client) {
        this.client = client;
    }

    process(message) {        
        var first_cmd = message.split(' ')[0].toLowerCase();
        // check if there is additional for the command
        if (message.indexOf(' ') < 1) {
            var the_rest = '';
        } else {
            // clean up the extra
            var the_rest  = message.substring(message.indexOf(' ')+1, message.length).trim();            
        }

        var feedback = '';

        switch (first_cmd) {
            case 'hello':
            case 'hi':
            case 'hai':
            case 'yo':
                feedback = gameFunctions.hello(the_rest);
                break;
            // navigation
            case 'move':
            case 'go':
            case 'run':
            case 'head':
            case 'walk':
            case 'move':
            case 'travel':
                feedback = gameFunctions.navigate(the_rest);
                break;  
            // conversation
            case 'ask':
                break;
            case 'talk':
                break;
            // combat
            case 'fight':
                break;
            // preparation
            // misc
            case 'who':
            case 'mirror':
                feedback = gameFunctions.mirror(this.client.identity);
                break;
            default:
                feedback = gameFunctions.huh();
                break;
        }

        // if there is anything to report
        this.client.updtHandler.process(feedback);
    }
}