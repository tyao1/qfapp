'use strict';

import React from 'react';
import router from './router';
import Banner from './components/Banner/Banner';

router.run(function (Handler) {
  React.render(
      <Handler/>
    , document.body);
});
