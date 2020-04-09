import React, { useState, useRef } from 'react';
import API from '../utils/API'

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
    )
}

export default Login;