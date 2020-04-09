import React, { useState, useRef } from 'react';
import Axios from 'axios';


function Login() {

    const [login, setLogin] = useState({});

    const nameRef = useRef();
    const passRef = useRef();

    const handleChange = () => {
        const username = nameRef.current.value;
        const password = passRef.current.value;
        const login = {
            username,
            password
        }

        setLogin({
            username: username,
            password: password
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        Axios.post('/api/login', login);


    }

    console.log(`login state username: ${login.username} password: ${login.password}`);

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
                        <button type="submit" name="submit" onClick={handleLogin}>sign in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;