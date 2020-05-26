import React, { useRef, useState } from 'react';
import { useUserContext } from '../utils/GlobalState'
import API from '../utils/API'
import { SET_CURRENT_USER } from '../utils/actions';
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

    const emailRef = useRef();
    const nameRef = useRef();
    const passRef = useRef();

    const handleChange = () => {
        const email = emailRef.current.value;
        const username = nameRef.current.value;
        const password = passRef.current.value;

        setSignUp({
            username: username,
            password: password,
            email: email
        })
    }

    const handleSignup = (e) => {
        e.preventDefault();
        const newUser = {
            email: signUp.email,
            username: signUp.username,
            password: signUp.password
        }
        // console.log('components/Signup.js sign up', newUser)
        API.registerUser(newUser)
            .then(() => {
                API.login({ username: signUp.username, password: signUp.password })
                window.location.assign(`${signUp.username}/setup`)
            })
        }

    return (
        <div className="signup-page">
            <div className="container login signup">
                <div>
                    <h3>Xfolio signups are currently invite only!</h3>
                    {/* <form>
                        <h1>Welcome to <span>X</span>folio!</h1>
                        <div>
                            <input type="text" name="email" placeholder="email" onChange={handleChange} ref={emailRef} />
                    </div>
                        <div>
                            <input type="text" name="username" placeholder="username" onChange={handleChange} ref={nameRef} />
                    </div>
                    <div>
                        <input type="password" name="password" placeholder="password" onChange={handleChange} ref={passRef} />
                        </div>
                <Link to="/Login"><p>Already have an account? Log in here</p></Link>
                        <div>
                            <button name="signup" onClick={handleSignup}>sign up</button>
                            <br />
                        </div>
                    </form> */}
                </div>
            </div>
          <Granim isPausedWhenNotInView ="true" image= {granimImg} states = {granimColor} id="canvas-image" />
       </div>
    )
}

export default Signup;