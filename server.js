const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const socketio = require('socket.io');
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketio(server);


var ws = new WebSocket('wss://ws.coinapi.io/v1/');
ws.on('open', () => {
    var hello = {
        "type": "hello",
        "apikey": "93E1F6E8-FB74-405B-975C-415AC33BC71B", //api from coinapi.io
        "heartbeat": "false",
        "subscribe_data_type": ["trade"],
        "subscribe_filter_symbol_id": ["BITFOREX_SPOT_ETH_TUSD", "BINANCE_SPOT_BTC_USDT"],
        "subscribe_filter_asset_id": ["ETH","BTC"]
    };
    ws.send(JSON.stringify(hello));
});

var updates=[];


ws.on('message', (data,err) => {
    console.log("data is:", data);
    if(err){
        console.log(err);    
        return;
    }
    updates.push(data);
});


io.on('connection', (socket) => {
    console.log('a user connected!');
});

io.emit('updates', updates);

app.use(cors());
server.listen(port, () => {
    console.log("Connection successful");
});
