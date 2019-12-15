import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import Home from '../Components/Home/Home';
import Navbar from '../Components/MyNavbar/MyNavbar';
import ProductPage from '../Components/ProductPage/ProductPage';


import './App.scss';


class App extends React.Component {
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
                <Route path="/ClubProductsId/:id" component={ProductPage}>
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
