import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  
  apiKey = process.env.REACT_APP_NEWS_API
  
  state = {
    progress: 0
  }

  
  setProgress = (number) => {
    this.setState({progress: number})
  }

  render() {
    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar 
        color='#f11946' 
        height={3}
        progress={this.state.progress} />
            <Routes>
              <Route exact path='/' element={<News key="general" setProgress={this.setProgress} pageSize={9} country="in" category="general" apiKey={this.apiKey}/>}></Route>
              <Route exact path='/business' element={<News key="business" setProgress={this.setProgress} pageSize={9} country="in" category="business" apiKey={this.apiKey}/>}></Route>
              <Route exact path='/entertainment' element={<News key="entertainment" setProgress={this.setProgress} pageSize={9} country="in" category="entertainment" apiKey={this.apiKey}/>}></Route>
              <Route exact path='/health' element={<News key="health" setProgress={this.setProgress} pageSize={9} country="in" category="health" apiKey={this.apiKey}/>}></Route>
              <Route exact path='/science' element={<News key="science" setProgress={this.setProgress} pageSize={9} country="in" category="science" apiKey={this.apiKey}/>}></Route>
              <Route exact path='/sport' element={<News key="sport"  setProgress={this.setProgress} pageSize={9} country="in" category="sport" apiKey={this.apiKey}/>}></Route>
              <Route exact path='/technology' element={<News key="technology"  setProgress={this.setProgress} pageSize={9} country="in" category="technology" apiKey={this.apiKey}/>}></Route>
            </Routes>
        </Router>
      </div>
    )
  }
}
