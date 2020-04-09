import React, { createContext, useReducer, useContext } from 'react';

const GlobalUser = createContext();
const { Provider } = GlobalUser;

const reducer = (state, action)