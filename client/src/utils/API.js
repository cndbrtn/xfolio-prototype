import axios from 'axios';

export default {
    // getUsers: function () {
    //     return axios.get('/api/user');
    // },
    getUser: function (id) {
        return axios.get(`/api/user/${id}`)
    },
    registerUser: function (newUser) {
        return axios.post('/api/user', {
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
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
        return axios.get('/api/user')
    },
    getArtworks: () => {
        return axios.get('api/artwork')
    }
}