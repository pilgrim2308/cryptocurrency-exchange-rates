import React, { Component } from "react";

class App extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div id="container">
        <h1>React connected!</h1>
        <canvas id="myChart"></canvas>
        </div>
      );
    }
}

export default App;