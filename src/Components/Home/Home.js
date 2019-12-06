import React from 'react';

import getLatestProducts from '../../Helpers/Data/ProductsData';

import ProductCard from '../ProductCard/ProductCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    latestProducts: [],
  }

  componentDidMount() {
    getLatestProducts()
      .then((res) => this.setState({ latestProducts: res }));
  }

  render() {
    const { latestProducts } = this.state;
    const printLatestProducts = latestProducts.map((product) => <ProductCard
        product={product}
      />);
    return (
      <div className="Home">
        <div className="home-sidebar">
          <h4>Product Categories</h4>
          <ul>
            <li>Tickets (20)</li>
            <li>Spectator Packages (5)</li>
            <li>Fighter Packages (4)</li>
          </ul>
        </div>
        <div className="home-main">
          <h1>Products</h1>
          {printLatestProducts}
        </div>
      </div>
    );
  }
}

export default Home;
