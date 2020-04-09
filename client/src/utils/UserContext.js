import { createContext } from 'react';

const UserContext = createContext({
    username: '',
    name: '',
    email: '',
    journal: [],
    works: []
})

export default UserContext;