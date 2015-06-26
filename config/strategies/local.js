var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');


module.exports = function(){
  passport.use(new LocalStrategy(function(username, password, done){
    console.log(username);
    User.findOneByUsername({
      username: username
    }, function(err, user){
      if(err) return done(err);
      console.log(user);
      if(!user){
        return done(null, false, {
          message: 'Unknown user'
        });
      }
      if(!user.authenticate(password)){
        return done(null, false, {
          message: 'Invalid password'
        });
      }

      return done(null, user);
    });
  }));
};
