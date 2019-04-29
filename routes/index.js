var express = require('express');
var router = express.Router();

const Offer = require('../models/offer');
/* GET home page. */
router.get('/', async (req, res, next) => {
  const offers = await Offer.find();
  res.render('index', {
    offers
  });
});

router.post('/add', async (req, res, next) => {
  const offer = new Offer(req.body);
  await offer.save();
  res.redirect('/');
});
router.get('/delete/:id', async (req, res) => {
  const { id } = req.params;
  await Offer.remove({id: id});
  res.redirect('/');
});
module.exports = router;
