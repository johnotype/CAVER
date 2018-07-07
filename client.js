const WebSocket = require('ws');
var ipAddr  = '127.0.0.1';
var port    = '8081';

var readline = require('readline'),
rl = readline.createInterface(process.stdin, process.stdout);

var ws = new WebSocket("ws://".concat(ipAddr,":",port));

var my_id = '';

ws.onopen = function (event) {
    console.log('Connection is open ...');
    // ws.send('username');
    // ws.onmessage = function (event) {
    //     console.log(event.data);
    // }
};

ws.onerror = function (err) {
    console.log('err: ', err);
};

ws.onmessage = function (event) {
    console.log(event.data);
    rl.prompt();
};

ws.onclose = function() {
    rl.close();
};

rl.setPrompt('INPUT> ');
rl.prompt();

// continuous line reading
rl.on('line', function(line) {
    switch(line.trim()) {
            case 'exit':
                ws.close();
                rl.close();
                break;
            default:
                // reduce traffic if string is empty
                if (line.trim().length > 0) {
                    ws.send(line.trim());                        
                }
            break;
        }
        //rl.prompt();
        }).on('close', function() {
    console.log('Connection has been closed');
    process.exit(0);
});