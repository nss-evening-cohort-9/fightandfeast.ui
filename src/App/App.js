import React from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import Home from '../Components/Home/Home';
import Auth from '../Components/Auth/Auth';
import Navbar from '../Components/MyNavbar/MyNavbar';
import Register from '../Components/Register/Register';
import fbConnection from '../Helpers/fbConnection';

import './App.scss';
import ProductCard from '../Components/ProductCard/ProductCard';

fbConnection();

const PublicRoute = ({ component: Component, authenticated, ...rest }) => (
  // const routeChecker = (props) => (<Component {...props } {...rest} />);
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

  logout = () => {
    this.setState({ authenticated: false });
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
                <PublicRoute path='/auth' component={Auth} authenticated={this.state.authenticated} />
                <PrivateRoute path='/home' component={Home} authenticated={this.state.authenticated} />
                <PrivateRoute path='/products' component={ProductCard} authenticated={this.state.authenticated} />
                <Redirect from="*" to="/home" />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
