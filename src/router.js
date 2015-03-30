'use strict';

import routes from './routes';
import Router from 'react-router';

var router = Router.create({
  routes: routes,
  location: Router.HashLocation
});

export default router;
