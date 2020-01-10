import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import Home from '../Components/Home/Home';
import Navbar from '../Components/MyNavbar/MyNavbar';
import Register from '../Components/Register/Register';
import fbConnection from '../Helpers/fbConnection';
import ProductPage from '../Components/ProductPage/ProductPage';
import UserProfile from '../Components/UserProfile/UserProfile';
import getCustomerById from '../Helpers/Data/CustomerData';

import './App.scss';
import ProductCard from '../Components/ProductCard/ProductCard';
import Login from '../Components/Login/Login';

fbConnection();

const PublicRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route {...rest} render={(props) => (authenticated === false ? (
  <Component {...props} />
  ) : (
    <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
  ))} />);

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
    <Route
      {...rest}
      render={(props) => (authenticated === true ? (
          <Component {...props} />
      ) : (
          <Redirect
            to={{ pathname: '/register', state: { from: props.location } }}
          />
      ))
      }
    />
);

class App extends React.Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged(this.authUser);
    getCustomerById()
      .then((res) => this.setState({ customerInfo: res }))
      .catch((err) => console.error(err));
  }

  componentWillUnmount() {
    this.removeListener();
  }

  authUser = (user) => {
    if (user) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ authenticated: false });
    }
  }

  render() {
    const { authenticated } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Navbar authenticated={authenticated}/>
              <Switch>
                <PublicRoute path='/register' component={Register} authenticated={this.state.authenticated} />
                <PublicRoute path='/login' component={Login} authenticated={this.state.authenticated} />
                <PrivateRoute path='/home' component={Home} authenticated={this.state.authenticated} />
                <PrivateRoute path='/products' component={ProductCard} authenticated={this.state.authenticated} />
                <PrivateRoute path="/ClubProductsId/:id" component={ProductPage} authenticated={this.state.authenticated} />
                <PrivateRoute path="/profile">
                  <UserProfile
                    customerInfo={this.state.customerInfo}
                  />
                </PrivateRoute>
                <Redirect from="*" to="/home" />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
