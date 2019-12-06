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

import './MyNavbar.scss';

const MyNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
      <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Fight & Feast</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/account/">Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/cart/">Cart</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Logout</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
