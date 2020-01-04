import axios from 'axios';

const baseUrl = 'https://localhost:44347/api';

const customerId = 1;

const getCustomerById = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/customers/${customerId}`)
    .then((res) => resolve(res.data))
    .catch((err) => reject(err));
});

export default getCustomerById;
