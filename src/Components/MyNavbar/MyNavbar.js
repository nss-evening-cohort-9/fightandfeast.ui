import React, { useState, useEffect } from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import Fuse from 'fuse.js';

import './MyNavbar.scss';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [allProducts, setAllProducts] = useState('');
  const [query, setQuery] = useState('');
  const searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'clubName',
      'productName',
    ],
  };
  const fuse = new Fuse(props.allProducts, searchOptions);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setAllProducts(query ? fuse.search(query) : props.allProducts);
  }, [query, allProducts, props.allProducts, fuse]);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Fight & Feast</NavbarBrand>
      <input
        type='search'
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={RRNavLink} to="/profile">Account</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/cart">Cart</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default MyNavbar;
