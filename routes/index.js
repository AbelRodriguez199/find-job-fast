var express = require('express');
var router = express.Router();

const Offer = require('../models/offer');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/add', (req, res, next) => {
  console.log(new Offer(req.body));
  res.send('recibido');
});

module.exports = router;
