'use strict';

import React from 'react';
import router from './router';
import Banner from './components/Banner';
import AppActions from './actions/AppActions'

router.run(function (Handler, state) {
  React.render(
      <Handler/>
    , document.body);

  AppActions.transition(state);

});
