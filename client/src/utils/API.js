import axios from 'axios';

export default {
    // getUsers: function () {
    //     return axios.get('/api/user');
    // },
    getUser: function (username) {
        // console.log(username)
        return axios.get('/api/user/' + username)
    },
    registerUser: function (newUser) {
        return axios.post('/api/user', {
            username: newUser.username,
            password: newUser.password,
            email: newUser.email
        })
    },
    login: function (login) {
        return axios.post('/api/user/login', {
            username: login.username,
            password: login.password
        })
    },
    logout: function () {
        return axios.post("/api/user/logout");
    },
    status: function () {
        return axios.get('/api/user');
    },
    postArt: (newArt) => {
        return axios.post('/api/artwork', newArt);
    },
    getArt: (username) => {
        return axios.get('/api/artwork' + username)
    },
    postJournal: (newPost) => {
        return axios.post('/api/blog', newPost);
    },
    getJournal: (username) => {
        return axios.get('/api/blog/' + username)
    }
}