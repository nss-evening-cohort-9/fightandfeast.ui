import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
// import firebase from 'firebase/app';
// import 'firebase/auth';

import './MyNavbar.scss';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logOutFb = (e) => {
    e.preventDefault();
    // firebase.auth().signOut();
  };

  const { authenticated } = props;

  const buildNavbar = () => {
    if (authenticated) {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/account/">Account</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/cart/">Cart</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={logOutFb}>Logout</NavLink>
          </NavItem>
        </Nav>
      );
    }

    return <Nav className="ml-auto" navbar />;
    if (!authenticated) {
      return (
      <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink>Login</NavLink>
          </NavItem>
      </Nav>
      );
  }
    return <Nav className="ml-auto" navbar />;
  };

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">Fight & Feast</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        {buildNavbar()}
      </Collapse>
    </Navbar>
  );
};

export default MyNavbar;
