import React from 'react';
import ProductData from '../../Helpers/Data/ProductData';
import ProductPage from '../ProductPage/ProductPage';


// import MyNavbar from '../MyNavbar/MyNavbar';

import './Home.scss';

class Home extends React.Component {
  state = {
    ProductPage : []
  }
  componentDidMount = () => {
    ProductData.getallProducts()
    .then(resp => {
      const data = resp 
      this.setState({product:data})
    })
  }

  
  render() {
    const products = this.state.products
    return (
      <>
        <h1>Home</h1>
        <ProductPage />
       
      </>
    );
  }
}

export default Home;
