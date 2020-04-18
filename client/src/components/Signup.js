import React, { useRef, useState } from 'react';
import { useUserContext } from '../utils/GlobalState'
import API from '../utils/API'
import { SET_CURRENT_USER, ADD_USER } from '../utils/actions';
import Granim from 'react-granim';
import { Link } from 'react-router-dom';


const granimColor = ({   "default-state": {
    gradients: [
        ['#e5ff00', '#ff5100'],
        ['#00ffff', '#556270'],
        ['#ff0062', '#7ea0c4'],
        ['#6200ff', '#fd0000']
    ],
    transitionSpeed: 7000}});
    
const granimImg = ({source: '../images/bg.jpeg', blendingMode: 'multiply'});


const Signup = () => {

    const [state, dispatch] = useUserContext();
    const [signUp, setSignUp] = useState({});

    // const [userLogin, setUserLogin] = useState();

    console.log("state", state);

    const emailRef = useRef();
    const nameRef = useRef();
    const passRef = useRef();

    const handleChange = () => {
        const email = emailRef.current.value;
        const username = nameRef.current.value;
        const password = passRef.current.value;

        setSignUp({
            // type: ADD_USER,
            username: username,
            password: password,
            email: email
        })

        // setState
        // console.log('state after login', state)
    }

    const handleSignup = (e) => {
        e.preventDefault();
        const newUser = {
            email: signUp.email,
            username: signUp.username,
            password: signUp.password
        }
        console.log('components/Signup.js sign up', newUser)
        API.registerUser(newUser)
            .then((user) => {
                console.log('Signup.js api.signup() result', user.data);
                // const userData = user.data;
                // setSignUp({
                //     _id: userData._id,
                //     username: userData.username
                // })
                
                API.login({ username: signUp.username, password: signUp.password })
                    .then(user => {
                        console.log('user data after post to api/login from signup', user.data)
                        dispatch({
                            ...state,
                            type: SET_CURRENT_USER,
                            username: user.data.username,
                            _id: user.data._id,
                            // loggedIn: true
                    })
                })
                    // window.location.assign(`${signUp.username}/gallery`)
            })
                .catch(err => {
                    if (err) console.log('components/Signup.js error', err);
                })
        }

    return (
        <div className="signup-page">
            <div className="container login signup">
                <div>
                    <form>
                        <div>
                            <p>Sign up:</p>
                            <input type="text" name="email" placeholder="email" onChange={handleChange} ref={emailRef} />
                    </div>
                        <div>
                            <input type="text" name="username" placeholder="Username" onChange={handleChange} ref={nameRef} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password" onChange={handleChange} ref={passRef} />
                        </div>
                        <div>
                            <button name="signup" onClick={handleSignup}>sign up</button>
                            <br />
                        </div>
                    </form>
                </div>
                <Link to="/Login"><p>Already have an account? Log in here</p></Link>
            </div>
          <Granim isPausedWhenNotInView ="true" image= {granimImg} states = {granimColor} id="canvas-image" />
       </div>
    )
}

export default Signup;