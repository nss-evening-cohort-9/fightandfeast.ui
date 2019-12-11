import React from 'react';
import getallProducts from '../../Helpers/Data/ProductData';
import ProductData from '../../Helpers/Data/ProductData';
import  './ProductPage.scss';


class Product extends React.Component {

    state = {
        product : {},
        
    };

      componentDidMount = () => {
        ProductData.getProductbyid()
        .then(resp => {
          this.setState({ product:resp.data})
        })
      }




    
render() {
    const { product } = this.state;
            return (
                <div className= "DriveCard col-3">
                <div className= "divive-card product">
                <div className= "product-body">
                {/* <h5 className="card-title">{product.Name}</h5>
                <h6 className="card-typeid">{product.TypeId}</h6>
                <h6 className="card-price">{product.Price}</h6>
                <h6 className="card-decription">{product.Description}</h6> */}

                </div>
                </div>

                </div>
              
            );
}

        
      
    }

export default Product;