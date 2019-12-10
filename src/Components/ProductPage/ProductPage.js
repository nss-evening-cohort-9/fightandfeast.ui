import React from 'react';
import getallProducts from '../../Helpers/Data/ProductData';
import ProductData from '../../Helpers/Data/ProductData';
import  './ProductPage.scss';


class Product extends React.Component {

    state = {
        products : [],
        
    };

      componentDidMount = () => {
        ProductData.getallProducts()
        .then(resp => {
          const data = resp 
          this.setState({products:data})
        })
      }


//     componentDidMount () {
//         getallProducts.getallProducts().then(data => {
//             this.setState({products:data});
//         });
//     } 

//     buildProducts= () => this.state.products.map(t => (
//         <div key={t.Id}>{t.Name}</div>
//         ));
// getallProducts = () =>{
//     ProductData.getallProducts()
//     .then(productCard => this.setState({ productCard}))
//     .catch(error => console.error(error));

// }

    
render() {
    const { product } = this.state;
            return (
                <div className= "DriveCard col-3">
                <div className= "divive-card products">
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