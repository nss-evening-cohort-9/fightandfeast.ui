import React from 'react';

import Fuse from 'fuse.js';
import ProductsData from '../../Helpers/Data/ProductsData';

import ProductCard from '../ProductCard/ProductCard';


import './Home.scss';

class Home extends React.Component {
  state = {
    allProducts: [],
    productsResults: [],
    query: '',
  }

  searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'clubName',
      'productName',
    ],
  };

  fuse = new Fuse(this.state.allProducts, this.searchOptions);

  // useEffect(() => {
  //   setAllProducts(this.state.query
  //     ? this.fuse.search(this.state.query) : this.state.allProducts);
  // }, [query]);

  updateQuery = (queryValue) => {
    this.setState({ query: queryValue });
    const newProductsResults = queryValue
      ? this.fuse.search(queryValue)
      : this.state.allProducts;
    this.setState({ productsResults: newProductsResults });
  }

  componentDidMount() {
    ProductsData.getLatestProducts()
      .then((res) => this.setState({ productsResults: res }))
      .catch((err) => console.error(err));
    ProductsData.getAllProducts()
      .then((res) => this.setState({ allProducts: res }))
      .catch((err) => console.error(err));
  }

  render() {
    console.error(this.fuse.search('h'));
    const { productsResults } = this.state;
    const printLatestProducts = productsResults.map((product) => {
      const uniqueKey = `${product.productName.charAt(0)}${product.clubProductId}`;
      return (
        <ProductCard
          key={uniqueKey}
          product={product}
        />
      );
    });
    return (
      <div className="Home">
        <div className="home-sidebar">
          <input
            type='search'
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.currentTarget.value)}
          />
          <h4>Product Categories</h4>
          <ul>
            <li>Tickets (20)</li>
            <li>Spectator Packages (5)</li>
            <li>Fighter Packages (4)</li>
          </ul>
        </div>
        <div className="home-main">
          <h1>Products</h1>
          <div className="home-main-productWindow">
            {productsResults ? printLatestProducts : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
