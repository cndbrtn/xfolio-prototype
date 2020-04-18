import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserProvider } from './utils/GlobalState'
import Container from './components/Container';
import Login from './components/Login';
import Signup from './components/Signup';
import ArtWork from './components/ArtWork';
import Blog from './components/Blog';
import Gallery from './components/Gallery'
import API from './utils/API';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faTrash, faPencilAlt);


const App = () => {  

  const [isLoggedIn, setIsLoggedIn] = useState({
    loggedIn: false,
    username: '',
    _id: ''
  });

  console.log('isLoggedIn state', isLoggedIn)

  useEffect(() => {
    API.status()
      .then(res => {
        // if (res.data.user) {
          console.log('res in App.js useEffect', res.data)
          setIsLoggedIn({
            loggedIn: true,
            username: res.data.user[0].username,
            _id: res.data.user[0]._id
          });
        // } else {
        //   return;
        // }
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
      <Container loggedIn={loggedIn}>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/:username/blog'>
            <Blog loggedIn={loggedIn} username={username} _id={_id} />
          </Route>
          <Route exact path='/:username/gallery/work/:id' component={ArtWork} />
              {/* <ArtWork _id={_id} username={username} /> */}
          {/* </Route> */}
            <Route exact path='/:username/gallery'>
            <Gallery loggedIn={loggedIn} />
          </Route>
        </Switch>
      </Container>
    </Router>
  </UserProvider>
  )
}

export default App;