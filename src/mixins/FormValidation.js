'use strict';


const FormValidation = {
  statics: {
    isValidUserName: function(username) {
      return (username.length<16&&username.length>1&&isNaN(username)&&username.indexOf('@')<0);
    },
    isValidPassword: function(password) {
      var re = /^[a-zA-Z0-9@]{6,16}$/;
      return re.test(password);
    },
    isValidEmail: function(email) {
      var re = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/i;
      return re.test(email);
    },
    isValidVerify: function(verify) {
      return verify.length===4;
    }
  }

};

export default FormValidation;
