var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');
 
module.exports = function(){
    passport.use(new LocalStrategy(function(user, password, done){
        User.findOne({
            user: user
        }, function(err, user){
            if(err){
                return done(err);
            }
 
            if(!user){
                return done(null, false, {
                    message: 'User desconocido'
                });
            }
 
            if(!user.autentificar(password)){
                return done(null, false, {
                    message: 'Password Incorrecto'
                });
            }
 
            return done(null, user);
        });
    }));
};