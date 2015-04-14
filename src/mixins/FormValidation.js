'use strict';


const FormValidation = {
  statics: {
    isValidUserName: function(username) {
      return (username.length<20&&username.length>4);
    },
    isValidPassword: function(password) {
      return true;
    },
    isValidEmail: function(email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
    },
    isValidVerify: function(verify) {
      return verify.length===4;
    }
  }

};

export default FormValidation;
