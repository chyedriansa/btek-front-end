import axios from 'axios';

const http = (token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: 'https://btek-backend-inky.vercel.app',
    headers,
  });
};

export default http;
