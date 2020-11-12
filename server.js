const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const socketio = require('socket.io');
const port = process.env.PORT || 4001;

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('a user connected!');
});

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
// 
ws.on('message', (data,err) => {
    if(err){
        console.log(err);    
        return;
    }
    console.log(data);
    var obj = JSON.parse(data);
    obj.time_exchange = Date.parse(obj.time_exchange);
    io.emit('updates', obj);
});

app.get('/', (req,res) => {
    res.send("Homepage");
});

server.listen(port, () => {
    console.log("Connection successful");
});
