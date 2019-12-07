import React from 'react';
import moment from 'moment';

import './ProductCard.scss';

const ProductCard = (props) => {
  const {
    clubName,
    eventDate,
    price,
    productName,
    productDescription,
  } = props.product;
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
};

export default ProductCard;
