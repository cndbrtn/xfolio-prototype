import React, { useReducer, useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Switch } from 'react-router'

function App() {

  const [users, setUsers] = useState([])
  useEffect(() => {
    loadUsers();
  }, [])

  function loadUsers() {
    Axios.get('/api/users')
      .then((users) => setUsers(users.data))
      .catch(err => console.log(err))
   }

  return (
    <Router>
      <Switch>
        <Route exact path={['/', 'books']}>
          <div>
            <ul>
              {users.map(user => (
                <li key={user._id}>{user._id} {user.username}</li>
              ))}
            </ul>
              <h1>hello world</h1>
          </div>
        </Route>
      </Switch>
      
    </Router>
    
  );
}

export default App;
