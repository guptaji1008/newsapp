import './App.css';

import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar';

export default function App() {
  
 let apiKey = process.env.REACT_APP_NEWS_API
  
  const [progress, setProgress] = useState(0)

  
  const updateProgress = (number) => {
    setProgress(number)
  }

    return (
      <div>
        <Router>
        <Navbar/>
        <LoadingBar 
        color='#f11946' 
        height={3}
        progress={progress} />
            <Routes>
              <Route exact path='/' element={<News key="general" setProgress={updateProgress} pageSize={9} country="in" category="general" apiKey={apiKey}/>}></Route>
              <Route exact path='/business' element={<News key="business" setProgress={updateProgress} pageSize={9} country="in" category="business" apiKey={apiKey}/>}></Route>
              <Route exact path='/entertainment' element={<News key="entertainment" setProgress={updateProgress} pageSize={9} country="in" category="entertainment" apiKey={apiKey}/>}></Route>
              <Route exact path='/health' element={<News key="health" setProgress={updateProgress} pageSize={9} country="in" category="health" apiKey={apiKey}/>}></Route>
              <Route exact path='/science' element={<News key="science" setProgress={updateProgress} pageSize={9} country="in" category="science" apiKey={apiKey}/>}></Route>
              <Route exact path='/sport' element={<News key="sport"  setProgress={updateProgress} pageSize={9} country="in" category="sport" apiKey={apiKey}/>}></Route>
              <Route exact path='/technology' element={<News key="technology"  setProgress={updateProgress} pageSize={9} country="in" category="technology" apiKey={apiKey}/>}></Route>
            </Routes>
        </Router>
      </div>
    )
}
