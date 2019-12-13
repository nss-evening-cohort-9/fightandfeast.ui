import axios from 'axios';

const baseUrl = 'https://localhost:44347/api';

const getLatestProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/clubProducts/recent`)
    .then((res) => resolve(res.data))
    .catch((err) => reject(err));
});

const getProductById = () => new Promise((resolve, reject) => {
 axios.get(`${baseUrl}/ClubProducts/productid`)
  .then((res) => resolve(res.data))
  .catch((err) => reject(err));
});

export default { getLatestProducts,
                  getProductById
                }           
