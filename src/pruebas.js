module.exports.doSignUp = (req, res, next) => {
    User.findOne({ $or: [
      { email: req.body.email },
    ]})
      .then(user => {
        if (user) {
          const errors = {}
          if (req.body.email === user.email) {
            errors.email = 'Email allready exists'
          }
          res.render("/signup", {
            user: req.body,
            errors: errors
          });
        } else {
          user = new User(req.body)
          return user.save()
            .then(user => res.redirect("/profile"))
        }
      })
      .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render("/signup", {
            user: req.body,
            errors: error.errors
          });
        } else {
          next(error);
        }
      })
  };


  module.exports.doLogIn = (req, res, next) => {
    passport.authenticate('local-auth', (error, user, validations) => {
      if (error) {
        next(error);
      } else if (!user) {
        console.log(validations);
        res.render("auth/login", {
            user: req.body,
            errors: validations
          });
      } else {
        req.login(user, (error) => {
          if (error) {
            next(error);
          } else {
            res.redirect('/');
          }
        });
      }
    })(req, res, next);
  };

  
  
  
  