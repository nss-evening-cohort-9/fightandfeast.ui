import React from 'react';

import productsData from '../../Helpers/Data/ProductsData';

import ProductCard from '../ProductCard/ProductCard';

import './Home.scss';

class Home extends React.Component {
  state = {
    latestProducts: [],
    productsClub: [],
  }


  filterProduct = (e) => {
    const ProductType = e.target.id;
    console.error(ProductType, '888');
    const intProductType = parseInt(ProductType, 10);
    console.error(ProductType);
    const { productsClub } = this.state;
    if (intProductType === 0) {
      this.getAllProductsClub();
    }
    const filteredData = productsClub.filter((product) => product.typeId === intProductType);
    this.setState({
      latestProducts: filteredData,
    });
    console.error(this.state.latestProducts, 'ppp');
  }


  getAllProductsClub = () => {
    productsData.getLatestProducts()
      .then((res) => this.setState({ latestProducts: res, productsClub: res }))
      .catch((err) => console.error(err));
  }

  componentDidMount() {
    this.getAllProductsClub();
  }

  render() {
    const { latestProducts } = this.state;
    const printLatestProducts = latestProducts.map((product) => {
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
          <h4>Product Categories</h4>
          <ul
          onClick={this.filterProduct}
          >
            <li id='1' >Tickets({latestProducts.length})</li>
            <li id='2'>Spectator Packages({latestProducts.length})</li>
            <li id='3' >Fighter Packages({latestProducts.length})</li>
            <li id='0' >All</li>

          </ul>
        </div>
        <div className="home-main">
          <h1>Products</h1>
          <div className="home-main-productWindow">
            {
              (latestProducts.length > 0)
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
