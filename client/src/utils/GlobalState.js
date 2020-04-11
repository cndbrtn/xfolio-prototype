import React, { createContext, useReducer, useContext } from 'react';
import { SET_CURRENT_USER, LOGIN_USER } from './actions';

const UserContext = createContext();
const { Provider } = UserContext;

const reducer = (state, action) => {
    console.log('action object', action) // console logs the action object with all the info I need to store
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                _id: action._id,
                username: action.username,
                nickname: action.nickname,
                journal: action.journal,
                works: action.works,
                favorites: action.favorites
            };
        case LOGIN_USER:
            return {
                ...action
            }
        default:
            return state;
    }
};

const initialState = {
    _id: 0,
    username: '',
    nickname: '',
    journal: [],
    works: [],
    favorites: [],
    password: '',
    email: ''
};

const UserProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return <Provider value={[state, dispatch]} {...props} />
};

const useUserContext = () => {
    return useContext(UserContext);
};

export { UserProvider, useUserContext };