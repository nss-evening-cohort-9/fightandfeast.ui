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
import fbConnection from '../Helpers/fbConnection';

import './App.scss';
import ProductCard from '../Components/ProductCard/ProductCard';

fbConnection();

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  const routeChecker = (props) => (<Component {...props } {...rest} />);
  return <Route render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const routeChecker = (props) => (authenticated === true
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
  );
  return <Route render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authenticated: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authenticated: true });
      } else {
        this.setState({ authenticated: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authenticated } = this.state;

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <Navbar authenticated={authenticated}/>
              <Switch>
                <PublicRoute path='/home' component={Home} authenticated={this.state.authenticated} />
                <PrivateRoute path='/products' component={ProductCard} authenticated={this.state.authenticated} />
                <Redirect from="*" to="/" />
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
