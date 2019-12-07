import axios from 'axios';

const baseUrl = 'https://localhost:44347/api';

const getLatestProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/clubProducts`)
    .then((res) => resolve(res.data))
    .catch((err) => reject(err));
});

export default getLatestProducts;
