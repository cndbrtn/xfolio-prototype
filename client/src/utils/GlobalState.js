import React, { createContext, useReducer, useContext } from 'react';

import { SET_CURRENT_USER, LOGIN_USER, ADD_USER, GALLERY_PROPS } from './actions';

const UserContext = createContext();
const { Provider } = UserContext;

const reducer = (state, action) => {
    // console.log('action object', action.type) // console logs the action object with all the info I need to store
    // const { type, _id, username, nickname, journal, works, favorites, password } = action;
    switch (action.type) {
        case SET_CURRENT_USER:
            // console.log('action inside SET CURRENT', action);
            return {
                ...state,
                type: action.type,
                _id: action._id,
                username: action.username,
                // nickname,
                // journal,
                // works,
                // favorites,
                password: '',
            }
        case LOGIN_USER:
            return {
                ...action
            };
        case ADD_USER: 
            return {
                ...action
            };
        case GALLERY_PROPS:
            return {
                ...state,
                ...action            }
        default:
            return state;
    }
};

let initialState = {
    type: '',
    _id: '0',
    username: '',
    nickname: '',
    journal: [],
    works: [],
    favorites: [],
    password: '',
    uploaded: false,
    // loggedIn: false
};

const UserProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // console.log('UserProvider props', props);
    return <Provider value={[state, dispatch]} {...props} />
};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserContext };