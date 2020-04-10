import React, { useRef } from 'react';
import { useUserContext } from '../utils/GlobalState'
import API from '../utils/API'
import { SET_CURRENT_USER, LOGIN_USER } from '../utils/actions';
import Granim from 'react-granim';


const granimColor = ({   "default-state": {
    gradients: [
        ['#29323c', '#485563'],
        ['#FF6B6B', '#556270'],
        ['#80d3fe', '#7ea0c4'],
        ['#f0ab51', '#eceba3']
    ],
    transitionSpeed: 7000}});
    
const granimImg = ({source: '../images/bg.jpeg', blendingMode: 'multiply'});


function Login() {

    // const [userLogin, setUserLogin] = useState({
    //     username: '',
    //     password: ''
    // });

    const [state, dispatch] = useUserContext();

    const nameRef = useRef();
    const passRef = useRef();

    const handleChange = () => {
        const username = nameRef.current.value;
        const password = passRef.current.value;
        // const login = {
        //     username,
        //     password
        // }

        dispatch({
            ...state,
            type: LOGIN_USER,
            username: username,
            password: password
        })
        // console.log('state after login', state)
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const login = {
            username: state.username,
            password: state.password
        }
        console.log('components/Login.js login', login)
        API.login(login)
            .then((user) => {
                console.log('Login.js api.login() result', user.data[0]);
                const userData = user.data[0];
                dispatch({
                    type: SET_CURRENT_USER,
                    ...userData
                })
                    // .catch(err => console.log('error at Login.js storeUser', err))
                
                    // window.location.assign(`/${userLogin.username}/blog`)
                })
                .catch(err => {
                    if (err) console.log('components/Login.js error', err);
                })
        }

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