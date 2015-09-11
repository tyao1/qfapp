'use strict';

import React from 'react';
import router from './router';
import Banner from './components/Banner';
import AppActions from './actions/AppActions'
document.title='载入中 - 清风';

router.run(function (Handler, state) {
  React.render(
      <Handler/>
    , document.body);

  AppActions.transition(state);

});
