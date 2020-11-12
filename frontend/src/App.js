import React, {Component} from "react";
import CanvasJSReact from './canvasjs.stock.react';
import SocketIOclient from 'socket.io-client';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
var dps = [{x: new Date(1605120697736), y: 15906.85}, {x: new Date(1605120699003), y: 15800.85}],
    dps2 = [{x: new Date(1605120698736), y: 15829.85}, {x: new Date(1605120698703), y: 15839.85}];

class App extends Component { 
  constructor(props){
    super(props);
    this.state = {                     
      endpoint: "http://localhost:4001/"
    };
  }

  componentDidMount(){
    const socket = SocketIOclient(this.state.endpoint);
    socket.on('updates', (data) => {
      if(data.symbol_id === "BINANCE_SPOT_BTC_USDT") {
        dps.push({x: new Date(data.time_exchange), y: data.price });
      }
      else {
        dps2.push({x: new Date(data.time_exchange), y: data.price });
      }
    })
  }

  render() { 
    const options = {
      title: {
        text: "Bitcoin and Etherium Exchange Rates"
      },
      animationEnabled: true,
      exportEnabled: true,
      charts: [{
        axisX: {
          crosshair: {
            enabled: true,
            snapToDataPoint: true
          },
          interval: 1,
          intervalType: "second",
          title: "Time -->"
        },
        axisY: {
          crosshair: {
            enabled: true
          },
          title: "Price in USD -->",
          prefix: "$"
        },
        data: [{
          type: "spline",
          name: "Bitcoin Prices",
          showInLegend: true,
          xValueFormatString: "HH:mm:ss D MMM YYYY",
          yValueFormatString: "#####.###",
          dataPoints: dps
        }, {
          type: "spline",
          name: "Etherium Prices",
          showInLegend: true,
          xValueFormatString: "HH:mm:ss D MMM YYYY",
          yValueFormatString: "#####.###",
          dataPoints: dps2
        }]
      }],
      rangeSelector: {
        inputFields: {
          startValue: 0,
          endValue: 100,
          valueFormatString: "####0"
        },

        buttons: [{
          label: "1000",
          range: 1000,
          rangeType: "number"
        }, {
          label: "All",
          rangeType: "all"
        }]
      }
    };
    const containerProps = {
      width: "80%",
      position: "absolute",
      top: "15%",
      left: "10%",
      height: "450px",
      margin: "auto"
    };
    return (
      <div>
        <div>
          <CanvasJSStockChart containerProps={containerProps} options={options}
          />
        </div>
      </div>
    )
  }
}

export default App;