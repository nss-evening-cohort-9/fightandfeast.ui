import axios from 'axios';

const baseUrl = "https://localhost:44347/api";


const getallProducts = () => new Promise((resolve, reject) =>
axios.get(`${baseUrl}/products`)
.then((response) =>
resolve(response.data)
)
.catch(err => reject(err))
);

export default { getallProducts }