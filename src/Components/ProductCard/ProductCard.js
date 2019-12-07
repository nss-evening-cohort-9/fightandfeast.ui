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
    <div className="ProductCard border p-2">
      <h6 className="mb-0">{productName}</h6>
      <p className="border-bottom pb-1 mb-1">at {clubName}</p>
      <p>{productDescription}</p>
      <div className="product-card-price">
        <p className="p-0 m-0">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
