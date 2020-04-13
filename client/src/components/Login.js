import React, { useRef, useEffect } from 'react';
import { useUserContext } from '../utils/GlobalState'
import API from '../utils/API'
import { SET_CURRENT_USER, LOGIN_USER } from '../utils/actions';
import Granim from 'react-granim';
import { useHistory } from 'react-router-dom';

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
    // setting up our global state context
    const [state, dispatch] = useUserContext();
    // useHistory to send the user where we want without whiping out stored state
    const history = useHistory();
    // console.log('early state', state);

    // checking if the user is already logged in

    useEffect(() => {
        API.status()
            .then(res => {
                console.log('api.status response', res)
                if (res.data.user) {
                    dispatch({
                        ...state,
                        isLoggedIn: true
                    });
                }
            })
            // .then(() => {
            //     history.push(`/${state.username}/blog`);
            // })
            .catch(err => {
                console.log('error', err)
            })
    });

    // our element references
    const nameRef = useRef();
    const passRef = useRef();

    // handle input change function
    const handleChange = () => {
        // variables to dispatch
        const username = nameRef.current.value;
        const password = passRef.current.value;
        const type = LOGIN_USER;

        // dispatch to our global state
        dispatch({
            ...state,
            type,
            username,
            password
        })
    };

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
                console.log('Login.js api.login() result', user);
                const userData = user.data[0];
                const type = SET_CURRENT_USER;
                const _id = userData._id;
                const username = userData.username;
                const nickname = userData.nickname;
                const password = '';
                const journal = userData.journal;
                const works = userData.works;
                const favorites = userData.favorites;

                // dispatch user data to global state to be used throughout their session
                dispatch({
                    ...state,
                    type,
                    _id,
                    username,
                    nickname,
                    password,
                    journal,
                    works,
                    favorites
                });
                if (!user) return console.log('invalid');
                history.push(`/${state.username}/gallery`);
            }).catch(err => console.log(err));
        
        // send user to new location by manipulating browser history? I think? Whatever it does it WORKS
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
            </div>
          <Granim isPausedWhenNotInView ="true" image= {granimImg} states = {granimColor} id="canvas-image" />
       </div>
    )
}

export default Login;