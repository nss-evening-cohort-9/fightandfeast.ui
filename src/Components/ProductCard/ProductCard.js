import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './ProductCard.scss';

const ProductCard = (props) => {
  const {
    clubProductId,
    clubName,
    eventDate,
    price,
    productName,
    productDescription,

  } = props.product;
  const ProductPageLink = `/ClubProductsId/${clubProductId}`;
  return (
    <div className="ProductCard border p-2">
      <h6 className="mb-0">{productName}</h6>
      <p className="mb-0">at {clubName}</p>
      <p className="border-bottom pb-1 mb-1">{moment({ eventDate }).format('MMMM Do, YYYY')}</p>
      <p>{productDescription}</p>
      <div className="product-card-footer">
        <p className="p-0 m-0 product-card-price">${price.toFixed(2)}</p>
        <Link className="btn btn-success" to={ProductPageLink}>View</Link>
      </div>
    </div>
  );
};

export default ProductCard;
