const User=require('../model/user.model');
User.methods.toProfileJSONFor = function(){
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    };
  };
