import axios from 'axios';

const baseUrl = 'https://localhost:44347/api';

const getAllProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/clubProducts/`)
    .then((res) => resolve(res.data))
    .catch((err) => reject(err));
});

const getLatestProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/clubProducts/recent`)
    .then((res) => resolve(res.data))
    .catch((err) => reject(err));
});

const getProductById = (productId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/clubProducts/${productId}`)
    .then((res) => resolve(res.data))
    .catch((err) => reject(err));
});


export default {
  getAllProducts,
  getLatestProducts,
  getProductById,
};
