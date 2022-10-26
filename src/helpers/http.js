import axios from 'axios';

// const http = () => axios.create({
//   baseURL: 'https://rickandmortyapi.com/api',
// });
// const http = () => axios.create({
//   baseURL: 'http://localhost:8888',
// });

const http = (token) => {
  const headers = {};
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: 'http://localhost:8888',
    headers,
  });
};

export default http;
