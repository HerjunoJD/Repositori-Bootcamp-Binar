/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://tranquil-escarpment-07246.herokuapp.com/',
  // method: "POST",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default Api;
