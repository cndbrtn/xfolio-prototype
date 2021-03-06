import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserProvider } from './utils/GlobalState'
import Container from './components/Container';
import Login from './components/Login';
import Signup from './components/Signup';
import ArtWork from './components/ArtWork';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import SinglePost from './components/SinglePost';
import FilteredArt from './components/FilteredArt';
import UpdateArt from './components/UpdateArt';
import UpdateBlog from './components/UpdateBlog';
import NewProfile from './components/NewProfile';
import API from './utils/API';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

library.add(fab, faTrash, faPencilAlt);


const App = () => {  

  const [isLoggedIn, setIsLoggedIn] = useState({
    loggedIn: false,
    username: '',
    _id: ''
  });

  // console.log('isLoggedIn state', isLoggedIn)

  useEffect(() => {
    API.status()
      .then(res => {
          // console.log('res in App.js useEffect', res.data)
          setIsLoggedIn({
            loggedIn: true,
            username: res.data.user[0].username,
            _id: res.data.user[0]._id
          });
      })
      .catch(e => {
        console.log('error', e)
      })
  }, [])
  
  
  const { loggedIn, username, _id } = isLoggedIn;
  return (
  <UserProvider>
    <Router>
      <Container loggedIn={loggedIn}>
        <Switch>
            <Route exact path={['/', '/login']}>
              <Login loggedIn={loggedIn} username={username} id={_id} />
            </Route>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/:username/setup'>
              <NewProfile username={username} _id={_id} />
            </Route>
          <Route exact path='/:username/blog'>
            <Blog loggedIn={loggedIn} username={username} _id={_id} />
          </Route>
          <Route exact path='/:username/blog/:id' component={SinglePost} />
            <Route exact path='/:username/gallery/work/:id' component={ArtWork} />
            <Route exact path='/:username/gallery/:tag' component={FilteredArt} />
          <Route exact path='/:username/gallery'>
            <Gallery loggedIn={loggedIn} username={username} _id={_id} />
            </Route>
          <Route exact path='/:username/blog/update/:id' component={UpdateBlog} />
          <Route exact path='/:username/gallery/update/:id' component={UpdateArt} />
        </Switch>
      </Container>
    </Router>
  </UserProvider>
  )
}

export default App;