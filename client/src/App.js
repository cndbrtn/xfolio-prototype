import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserProvider } from './utils/GlobalState'
import Login from './components/Login';
import Signup from './components/Signup';
import Upload from './components/Upload';
import Blog from './components/Blog';
import Gallery from './components/Gallery'
import API from './utils/API';


function App() {  

  
  return (
        <UserProvider>
    <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Signup' component={Signup} />
            <Route exact path='/:username/blog'>
              <Blog />
            </Route>
            <Route exact path='/:username/upload'>
              <Upload />
          </Route>
          <Route exact path ='/:username/gallery'>
            <Gallery />
          </Route>
          </Switch>
    </Router>
        </UserProvider>
  )
}

export default App;