const router = require('express').Router();
const passport = require('passport');
const Offer = require('../models/offer');

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

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
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
