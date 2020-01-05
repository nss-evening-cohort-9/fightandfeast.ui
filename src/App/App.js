import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

import Home from '../Components/Home/Home';
import Navbar from '../Components/MyNavbar/MyNavbar';
import UserProfile from '../Components/UserProfile/UserProfile';
import getCustomerById from '../Helpers/Data/CustomerData';
import ProductsData from '../Helpers/Data/ProductsData';

import './App.scss';

class App extends React.Component {
  state = {
    customerInfo: [],
    allProducts: [],
    query: '',
  }

  componentDidMount() {
    getCustomerById()
      .then((res) => this.setState({ customerInfo: res }))
      .catch((err) => console.error(err));
    ProductsData.getAllProducts()
      .then((res) => this.setState({ allProducts: res }))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Navbar
              allProducts={this.state.allProducts}
              query={this.state.query}
            />
            <div>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/profile">
                  <UserProfile
                    customerInfo={this.state.customerInfo}
                  />
                </Route>

                <Redirect from="*" to="/" />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
