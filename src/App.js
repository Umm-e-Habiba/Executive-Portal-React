import React, { Component } from 'react';
import Routes from './routes/Routes';

import { configureFakeBackend } from './helpers';
import './assets/scss/theme.scss';

configureFakeBackend();

class App extends Component {

  render() {
    return <Routes></Routes>;
  }
}

export default App;