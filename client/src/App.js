import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import UserContext from './utils/UserContext'
import Login from './components/Login';
import Upload from './components/Upload';
import Blog from './components/Blog';
import API from './utils/API';
// import Axios from 'axios';
// import { BrowserRouter as Router, Route, Switch } from 'react-router'


function App() {  
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    API.status()
      .then(res => {
        if (res.data.user) {
          setIsLoggedIn(true);
        }
      })
      .catch(err => {
        console.log('error', err)
      })
  });

  return (
    <UserContext.Provider value={UserContext}>
      <Router>
        <Switch>
          <Route exact path={'/'} component={Login} />
          <Route exact path={'/:username/blog'}>
            <Blog isLoggedIn={isLoggedIn} username={UserContext.username} />
          </Route>
          <Route exact path={'/upload'}>
            <Upload isLoggedIn={isLoggedIn} />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

// function App() {

//   const [users, setUsers] = useState([])
//   useEffect(() => {
//     loadUsers();
//   }, [])

//   function loadUsers() {
//     Axios.get('/api/users')
//       .then((users) => setUsers(users.data))
//       .catch(err => console.log(err))
//    }

//   return (
//     <Router>
//       <Switch>
//         <Route exact path={['/', 'books']}>
//           <div>
//             <ul>
//               {users.map(user => (
//                 <li key={user._id}>{user._id} {user.username}</li>
//               ))}
//             </ul>
//               <h1>hello world</h1>
//           </div>
//         </Route>
//       </Switch>
      
//     </Router>
    
//   );
// }

export default App;
