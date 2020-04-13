import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserProvider } from './utils/GlobalState'
import Login from './components/Login';
import Upload from './components/Upload';
import Blog from './components/Blog';
import API from './utils/API';


function App() {  

  
  return (
        <UserProvider>
    <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/:username/blog'>
              <Blog />
            </Route>
            <Route exact path='/upload'>
              <Upload />
            </Route>
          </Switch>
    </Router>
        </UserProvider>
  )
}

export default App;