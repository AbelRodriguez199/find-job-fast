const router = require('express').Router();
const passport = require('passport');
const Offer = require('../models/offer');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  Offer.find()
    .then(function(offers) {
      res.render('index', { offers });
    })
});

router.post('/add', (req, res, next) => {
  const offer = new Offer(req.body);
  offer.save();
  res.redirect('/');

});

router.get('/delete/:id', (req, res,) => {
  const { id } = req.params;
  Offer.deleteOne({_id: id})
  .then((offer) => {res.redirect('/')})
  .catch((err) => {res.redirect('/'), err})
});
router.get('/edit/:id', (req, res, next) => {
  const { id } = req.params;
  const offer = Offer.findById(id)
  .then((offer) => {
    res.render("edit-offer", {offer});
  })
  .catch((error) => {
    console.log(error);
  })
});
router.post('/update/:id', (req, res,) => {
  const { id } = req.params;
  Offer.update({_id: id}, req.body)
  .then((offer) => {res.redirect('/')})
  .catch((err) => {res.redirect('/'), err})
});
router.get('/update-user/:id', (req, res, next) => {
  const { id } = req.params;
  const user = User.findById(id)
  .then((user) => {
    res.render("update-user", {user});
  })
  .catch((error) => {
    console.log(error);
  })
});router.post('/edit-user/:id', (req, res,) => {
  const { id } = req.params;
  User.update({_id: id}, req.body)
  .then((user) => {res.redirect('/profile')})
  .catch((err) => {res.redirect('/'), err})
});

router.get('/signup', (req, res, next) => {
  res.render('signup', { message: null });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: 'Invalid username or password.'
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});
router.get('/new-offer', (req, res, next) => {
  res.render('new-offer');
});
router.get('/new-offer', (req, res, next) => {
  Offer.find({}, function(err, offers){
    User.populate(offers, {path: "user"},function(err,offers){
      res.status(200).send(offers)
    })
  })
  res.render('new-offer');
});

router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});

router.get('/my-offers',isAuthenticated, (req, res, next) => {
  Offer.find({user:req.user._id})
    .then(function(offers) {
      res.render('my-offers', { offers });
    })
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});


function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/')
}

module.exports = router;
