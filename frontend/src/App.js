import React from 'react'
import {Switch, Route} from 'react-router-dom'
import StartPage from './components/StartPage'
import Footer from './components/Footer'
import Experiment from './components/Experiment'



function App() {

  
  

  return (
    <div >
      <div className="main_container">
      <Switch>
        <Route path="/" exact component={StartPage} />
       
        <Route path="/expirement" exact component={Experiment} />
       
        
      </Switch>
      <Footer/>
      </div>
    </div>
  )
}

export default App
