'use strict';

import React from 'react';
import invariant from 'react/lib/invariant';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import Navbar from '../Navbar';
import ContentPage from '../ContentPage';
import NotFoundPage from '../NotFoundPage';

//style file
require('./App.scss');

export default class App extends React.Component {

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  shouldComponentUpdate(nextProps) {
    return this.props.path !== nextProps.path;
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        {
          this.props.path === '/' ?
            <div className="jumbotron">
              <div className="container text-center">
                <h1>React</h1>
                <p>Complex web apps made easy</p>
              </div>
            </div> :
            <div className="container">
              <h2>asdasdasd</h2>
            </div>
          }
        <div className="navbar-footer">
          <div className="container">
            <p className="text-muted">
              <span>© Your Company</span>
              <span>
                <a href="/">Home</a>
              </span>
              <span>
                <a href="/privacy">Privacy</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

}
