import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import Home from '../Components/Home/Home';
import Navbar from '../Components/MyNavbar/MyNavbar';
import ProductPage from '../Components/ProductPage/ProductPage';
import UserProfile from '../Components/UserProfile/UserProfile';
import getCustomerById from '../Helpers/Data/CustomerData';

import './App.scss';


class App extends React.Component {
  state = {
    customerInfo: [],
  }

  componentDidMount() {
    getCustomerById()
      .then((res) => this.setState({ customerInfo: res }))
      .catch((err) => console.error(err));
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Navbar />
            <div>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/ClubProductsId/:id" component={ProductPage}></Route>
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
