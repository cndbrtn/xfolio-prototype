import React, { useRef } from 'react';
import { useUserContext } from '../utils/GlobalState'
import API from '../utils/API'
import { SET_CURRENT_USER, ADD_USER } from '../utils/actions';
import Granim from 'react-granim';
import { Link } from 'react-router-dom';


const granimColor = ({   "default-state": {
    gradients: [
        ['#e5ff00', '#485563'],
        ['#FF6B6B', '#556270'],
        ['#80d3fe', '#7ea0c4'],
        ['#f0ab51', '#eceba3']
    ],
    transitionSpeed: 7000}});
    
const granimImg = ({source: '../images/bg.jpeg', blendingMode: 'multiply'});


function Signup() {

    // const [userLogin, setUserLogin] = useState({
    //     username: '',
    //     password: ''
    // });

    const [state, dispatch] = useUserContext();

    console.log("state", state);

    const emailRef = useRef();
    const nameRef = useRef();
    const passRef = useRef();

    const handleChange = () => {
        const email = emailRef.current.value;
        const username = nameRef.current.value;
        const password = passRef.current.value;
        // const login = {
        //     username,
        //     password
        // }

        dispatch({
            ...state,
            type: ADD_USER,
            username: username,
            password: password,
            email: email
        })
        // console.log('state after login', state)
    }

    const handleSignup = (e) => {
        e.preventDefault();
        const newUser = {
            email: state.email,
            username: state.username,
            password: state.password
        }
        console.log('components/Signup.js sign up', newUser)
        API.registerUser(newUser)
            .then((user) => {
                console.log('Signup.js api.signup() result', user.data);
                const userData = user.data;
                dispatch({
                    type: SET_CURRENT_USER,
                    ...userData
                })
                    // .catch(err => console.log('error at Login.js storeUser', err))
                
                    // window.location.assign(`/${userLogin.username}/blog`)
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