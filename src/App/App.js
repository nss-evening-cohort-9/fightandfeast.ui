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
import Auth from '../Components/Auth/Auth';
import fbConnection from '../Helpers/fbConnection';

import './App.scss';

fbConnection();

const PublicRoute = ({ component: Component, authenticated, ...rest }) => {
  const routeChecker = (props) => (authenticated === false
    ? (<Component {...props } {...rest} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />)
  );
  return <Route render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  const routeChecker = (props) => (authenticated === true
    ? (<Component {...props} {...rest} />)
    : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
  );
  return <Route render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authenticated: false,
  }

  // loginClickEvent = (e) => {
  //   e.preventDefault();
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   firebase.auth().signInWithPopup(provider).then((user) => {
  //     if (user.credential.idToken !== '') {
  //       this.setState({ authenticated: true });
  //     } else {
  //       this.setState({ authenticated: false });
  //     }
  //   });
  // }

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
                {/* <PublicRoute path='/' component={Auth} login={this.loginClickEvent} authenticated={authenticated} /> */}
                {/* <PublicRoute path='/home' component={Home} authenticated={authenticated} /> */}
                {/* <Redirect from="*" to="/" /> */}
                <Route component={Auth} pathname="/"></Route>
              </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
