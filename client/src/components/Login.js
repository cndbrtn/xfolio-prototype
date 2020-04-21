import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecentArt from './RecentArt'
import API from '../utils/API'
import Granim from 'react-granim';


// initialize granim
const granimColor = ({   "default-state": {
    gradients: [
        ['#00a84c', '#b3ff00'],
        ['#00ffff', '#556270'],
        ['#ff0062', '#7ea0c4'],
        ['#6200ff', '#fd0000']
    ],
    transitionSpeed: 7000}});

// set granim image
const granimImg = ({ source: '../images/bg.jpeg', blendingMode: 'multiply' });

// login component
const Login = props => {

    console.log('props in login', props);
    // setting up our state
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const [art, setArt] = useState({
        works: []
    });

    useEffect(() => {
        API.recentArt()
        .then(works => {
            // console.log('response', works.data)
            setArt({
                works: works.data
            })
        })
    }, [])

    console.log('art', art)

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
                window.location.assign(`/${user.data.username}/gallery`);
            }).catch(err => console.log(err));
    };

    if (!art) {
        return (
            <div className="login-page">
                <div className="container login">
                    <div>
                        <h1><span>X</span>folio:</h1>
                        {props.loggedIn ?
                            (<div>
                                <h1>Welcome back {props.username}!</h1>
                                <p><Link to={`${props.username}/gallery`}>Your Gallery</Link></p>
                                <p><Link to={`${props.username}/blog`}>Your Blog</Link></p>
                            </div>):
                            (<form>
                                <div>
                                    <input type = "text" name = "username" placeholder = "Username" onChange = { handleChange } ref = { nameRef } />
                                </div>
                                <div>
                                    <input type="password" name="password" placeholder="password" onChange={handleChange} ref={passRef} />
                                </div>
                                <Link to="/Signup"><p>New to Xfolio? Sign up here</p></Link>
                                <div>
                                    <button name="login" onClick={handleLogin}>sign in</button>
                                </div>
                            </form>)
                        }  
                    </div>
                </div>
            {/* <RecentArt works={art} /> */}
              <Granim isPausedWhenNotInView ="true" image= {granimImg} states = {granimColor} id="canvas-image" />
            </div>
        )
    } else {
        return (
            <div className="login-page">
                <div className="container login">
                    <div>
                        <h1><span>X</span>folio:</h1>
                        {props.loggedIn ?
                            (<div>
                                <h1>Welcome back {props.username}!</h1>
                                <p><Link to={`${props.username}/gallery`}>Your Gallery</Link></p>
                                <p><Link to={`${props.username}/blog`}>Your Blog</Link></p>
                            </div>) :
                            (<form>
                                <div>
                                    <input type="text" name="username" placeholder="Username" onChange={handleChange} ref={nameRef} />
                                </div>
                                <div>
                                    <input type="password" name="password" placeholder="password" onChange={handleChange} ref={passRef} />
                                </div>
                                <Link to="/Signup"><p>New to Xfolio? Sign up here</p></Link>
                                <div>
                                    <button name="login" onClick={handleLogin}>sign in</button>
                                </div>
                            </form>)
                        } 
                    </div>
                </div>
                <RecentArt works={art} loggedIn={props.loggedIn} />
                <Granim isPausedWhenNotInView="true" image={granimImg} states={granimColor} id="canvas-image" />
            </div>
        )
    }
}

export default Login;