import React from 'react';

import Fuse from 'fuse.js';
import productsData from '../../Helpers/Data/ProductsData';

import ProductCard from '../ProductCard/ProductCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    allProducts: [],
    latestProducts: [],
    productsClub: [],
    productsResults: [],
    Seller: [],
  }

  searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'clubName',
      'productName',
    ],
  };

  updateQuery = (queryValue) => {
    const fuse = new Fuse(this.state.allProducts, this.searchOptions);
    this.sortVariables.query = queryValue;
    const newProductsResults = fuse.search(queryValue);
    console.error('newProductsResults', newProductsResults);
    queryValue !== ''
      ? this.setState({ productsResults: newProductsResults })
      : this.setState({ productsResults: this.state.latestProducts });
  }

  sortVariables = {
    query: '',
  }

  fillterProductBySeller = (clubName) => {
    const filteredData = this.state.allProducts.filter((product) => product.clubName === clubName);
    this.setState({
      productsResults: filteredData,
    });
  };


  filterProduct = (e) => {
    const ProductType = e.target.id;
    const intProductType = parseInt(ProductType, 10);
    const { allProducts } = this.state;

    const filteredData = allProducts.filter((product) => product.typeId === intProductType);
    this.setState({
      productsResults: filteredData,
    });
    if (intProductType === 0) {
      this.setState({
        productsResults: allProducts,
      });
    }
  }

  findAmount = (id) => {
    const filteredData = this.state.allProducts.filter((product) => product.typeId === id);
    return filteredData.length;
  };

  getAllProducts = () => {
    productsData.getAllProducts()
      .then((res) => this.setState({ allProducts: res }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    productsData.getLatestProducts()
      .then((res) => {
        if (this.props.match.params.searchByclubName) {
          console.error(res);
          const filteredData = res.filter((product) => product.clubName === this.props.match.params.searchByclubName);
          this.setState({ productsResults: filteredData });
        } else {
          this.setState({ productsResults: res, latestProducts: res });
        }
      })
      .catch((err) => console.error(err));
    this.getAllProducts();
  }

  render() {
    const { allProducts, productsResults } = this.state;
    const printLatestProducts = productsResults.map((product) => {
      const uniqueKey = `${product.productName.charAt(0)}${product.clubProductId}`;
      return (
        <ProductCard
          key={uniqueKey}
          product={product}
          fillterProductBySeller={this.fillterProductBySeller}

        />
      );
    });
    return (
      <div className="Home">
        <div className="home-sidebar">
          <input
            type='search'
            value={this.sortVariables.query}
            onChange={(event) => this.updateQuery(event.currentTarget.value)}
          />
          <h4>Product Categories</h4>
          <ul
          onClick={this.filterProduct}
          >
            <li id='1' >Tickets ({this.findAmount(1)})</li>
            <li id='2'>Spectator Packages ({this.findAmount(2)})</li>
            <li id='3' >Fighter Packages ({this.findAmount(3)})</li>
            <li id='0' >All ({allProducts.length})</li>

          </ul>
        </div>
        <div className="home-main">
          <h1>Products</h1>
          <div className="home-main-productWindow">
            {
              (productsResults.length > 0)
                ? (
                  printLatestProducts
                )
                : (
                  <React.Fragment>
                    <p>Results no found</p>
                  </React.Fragment>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
