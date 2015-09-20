import request from 'superagent';
import UserStore from '../stores/UserStore';

export default request.set('token', UserStore&&UserStore.getToken()).set('form_rand', UserStore&&UserStore.getForm());
