const cors = require('cors');
const express = require('express');
const app = express();
const WebSocket = require('ws');

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

ws.on('message', (data) => {
    console.log(data);
});

app.use(cors());
app.listen(5000, () => {
    console.log("Connection successful");
});

app.get('/api',(req,res) => {
    res.send("Exchange rates");
});