import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// import About from './components/About';

export default class App extends Component {

  render() {
    return (
      <>
      <Navbar/>     
      <News/>
      </>
    )
  }
}