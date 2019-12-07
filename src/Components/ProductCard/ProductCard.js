import React from 'react';

import './ProductCard.scss';

const ProductCard = (props) => {
  const {
    clubName,
    price,
    productName,
    productDescription,
  } = props.product;
  return (
    <div className="ProductCard border">
      <h6>{productName}</h6>
      <p>at {clubName}</p>
      <p>${price}</p>
      <p>{productDescription}</p>
    </div>
  );
};

export default ProductCard;
