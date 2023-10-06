import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://rickandmortyapi.com/api/'
});

export default instance;
