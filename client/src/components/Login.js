import React, { useState, useRef } from 'react';
import API from '../utils/API';
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

    const [userLogin, setUserLogin] = useState({
        username: '',
        password: ''
    });

    const nameRef = useRef();
    const passRef = useRef();

    const handleChange = () => {
        const username = nameRef.current.value;
        const password = passRef.current.value;
        // const login = {
        //     username,
        //     password
        // }

        setUserLogin({
            username: username,
            password: password
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        API.login(userLogin)
            .then(() => window.location.assign(`/${userLogin.username}/blog`))
            .catch(err => {
                if (err) console.log(err);
            })

    }

    

    console.log(`login state username: ${userLogin.username} password: ${userLogin.password}`);

    return (
        <div className="login-page">
            <div className="container login">
                <div>
                    <form onChange={handleChange}>
                        <div>
                            <input type="text" name="username" placeholder="Username" ref={nameRef} />
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="password" ref={passRef} />
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