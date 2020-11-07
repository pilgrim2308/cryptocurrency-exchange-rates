import React, { Component } from "react";
import { io } from 'socket.io-client';

var socket;
class App extends Component {
  constructor(){
    super();
      this.state = {
        info: []
      };
    socket = io("http://localhost:5000/");
  }

  setData(data){
    this.setState({
      info: data
    });
  }

  componentDidMount(){
    socket.on('connection', () => {
      console.log("Frontend connected!");
    });
    socket.on('updates', this.setData); 
  }

  displayData(){
    return this.state.info.map( data => {
      return (
        <p>{data}</p>
      );
    });
  }

  render() {
    return (
        <div id="container">
        <h1>React connected!</h1>
        <div>{this.displayData()}</div>
        </div>
    );
  }
}

export default App;