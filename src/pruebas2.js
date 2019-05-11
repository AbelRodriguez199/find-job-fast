
    router.post("/signup", (req, res, next) => {
        
  
    if (username === "" || password === "") {
      res.render("/signup", { message: "Indicate username and password" });
      return;
    }
  
    User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("/signup", { message: "The username already exists" });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username,
        password: hashPass
      });
  
      newUser.save((err) => {
        if (err) {
          res.render("/signup", { message: "Something went wrong" });
        } else {
          res.redirect("/profile");
        }
      });
    })
    .catch(error => {
      next(error)
    })
  });

  <!--<% if (email === "") { %>
    <div class="error-message btn-danger"><%= message %></div>
   <% } %>-->