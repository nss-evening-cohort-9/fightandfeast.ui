import React from 'react';
import moment from 'moment';
import ProductData from '../../Helpers/Data/ProductData';
import  './ProductPage.scss';


class Product extends React.Component {

    state = {
        product : {},
        
    };

   

      componentDidMount() {
       const productId = this.props.match.params.id;
       ProductData.getProductById(productId)
       .then(productPromise => this.setState({ product: productPromise.data }))
       .catch(err => console.error('unable to get product'));
      }



    
render() {
    const { product } = this.state;
            return (
              <div className="ProductCard border p-2">
              <h6 className="mb-0">{productName}</h6>
              <p className="mb-0">at {clubName}</p>
              <p className="border-bottom pb-1 mb-1">{moment({ eventDate }).format('MMMM Do YYYY')}</p>
              <p>{productDescription}</p>
              <div className="product-card-price">
                <p className="p-0 m-0">${price}</p>
              </div>
            </div>
              
            );
}

        
      
    }

export default Product;