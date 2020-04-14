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

  const [isLoggedIn, setIsLoggedIn] = useState({
    loggedIn: false,
    username: '',
    _id: ''
  });

  // console.log('isLoggedIn state', isLoggedIn)

  useEffect(() => {
    API.status()
      .then(res => {
        if (res.data.user) {
          // console.log('res in App.js useEffect', res.data.user[0])
          setIsLoggedIn({
            loggedIn: true,
            username: res.data.user[0].username,
            _id: res.data.user[0]._id
          });
        } else {
          return;
        }
      })
      .catch(e => {
        console.log('error', e)
      })
  }, [])
  
  
  const { loggedIn, username, _id } = isLoggedIn;
  // if (loggedIn) {
  //   return window.location.assign(`/${username}/gallery`)
  // }
  return (
        <UserProvider>
    <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/Login' component={Login} />
            <Route exact path='/Signup' component={Signup} />
            <Route exact path='/:username/blog'>
            <Blog loggedIn={loggedIn} username={username} _id={_id} />
            </Route>
            <Route exact path='/:username/upload'>
            <Upload loggedIn={loggedIn} username={username} _id={_id} />
          </Route>
          <Route exact path ='/:username/gallery'>
            <Gallery loggedIn={loggedIn} username={username} _id={_id} />
          </Route>
          </Switch>
    </Router>
        </UserProvider>
  )
}

export default App;