import React, { useRef, useState } from 'react';
import API from '../utils/API'
import Granim from 'react-granim';
import { Link } from 'react-router-dom';


// initialize granim
const granimColor = ({   "default-state": {
    gradients: [
        ['#29323c', '#485563'],
        ['#FF6B6B', '#556270'],
        ['#80d3fe', '#7ea0c4'],
        ['#f0ab51', '#eceba3']
    ],
    transitionSpeed: 7000}});

// set granim image
const granimImg = ({source: '../images/bg.jpeg', blendingMode: 'multiply'});

// login component
const Login = () => {
    // setting up our state
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    // our element references
    const nameRef = useRef();
    const passRef = useRef();

    // handle input change function
    const handleChange = () => {
        // variables to dispatch
        const username = nameRef.current.value;
        const password = passRef.current.value;
        // const type = LOGIN_USER;

        // dispatch to our global state
        setState({
            // ...state,
            // type,
            username,
            password
        })
    };
    console.log('state', state);

    // posts user data to the api to validate against the database
    const handleLogin = (e) => {
        e.preventDefault();
        const login = {
            username: state.username,
            password: state.password
        }
        console.log('components/Login.js login', login)
        API.login(login)
            .then((user) => {
                console.log('Login.js api.login() result', user.data.username);
                // window.location.assign(`/${user.data.username}/gallery`);
            }).catch(err => console.log(err));
    };

    return (
        <div className="login-page">
            <div className="container login">
                <div>
                    <form>
                        <div>
                            <input type="text" name="username" placeholder="Username" onChange={handleChange} ref={nameRef} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password" onChange={handleChange} ref={passRef} />
                        </div>
                        <div>
                            <button name="login" onClick={handleLogin}>sign in</button>
                        </div>
                    </form>
                </div>
                <Link to="/Signup"><p>New to Xfolio? Sign up here</p></Link>
            </div>
          <Granim isPausedWhenNotInView ="true" image= {granimImg} states = {granimColor} id="canvas-image" />
       </div>
    )
}

export default Login;