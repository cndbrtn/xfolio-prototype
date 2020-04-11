import React, { createContext, useReducer, useContext } from 'react';
import { SET_CURRENT_USER, LOGIN_USER, GET_CURRENT_USER } from '../utils/actions';

const UserContext = createContext();
const { Provider } = UserContext;

const reducer = (state, action) => {
    console.log('action object', action.type) // console logs the action object with all the info I need to store
    const { type, _id, username, nickname, journal, works, favorites, password } = action;
    switch (type) {
        case SET_CURRENT_USER:
            // console.log('action inside SET CURRENT', action);
            
            return {
                ...state,
                type,
                _id,
                username,
                nickname,
                journal,
                works,
                favorites,
                password: ''
            }
        case LOGIN_USER:
            return {
                ...state,
                type,
                username,
                password
            }
        case GET_CURRENT_USER:
            return {
                ...state
            }
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
    password: ''
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