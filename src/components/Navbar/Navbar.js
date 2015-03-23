/*
 * React.js Starter Kit
 * Copyright (c) 2014 Konstantin Tarkus (@koistya), KriaSoft LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import React from 'react';

export default class Navbar extends React.Component {

  render() {
    return (
      <div className="navbar-top" role="navigation">
        <div className="container">
          <a className="navbar-brand row" href="/">
            <span>fuckyou</span>
            <img src={require('./logo-small.png')} width="38" height="38" alt="React" />
            <span>React.js Starter Kit</span>
          </a>
        </div>
      </div>
    );
  }

}
