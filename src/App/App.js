import React from 'react';

import Home from '../Components/Home/Home';
import Navbar from '../Components/MyNavbar/MyNavbar';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
