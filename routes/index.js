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

router.get('/delete/:id', (req, res) => {
  const { id } = req.params;

  Offer.deleteOne({_id:id})
  .then((user)=>{res.redirect('/')})
  .catch((err)=>{res.redirect('/'), err})
});
module.exports = router;

/*router.get('/edit/:id', (req, res, next) => {
  Offer.findOne({_id: req.query.offer_id})
  .then((offer) => {
    res.render("edit-offer", {offer});
  })
  .catch((error) => {
    console.log(error);
  })
});
router.post('/edit/:id', (req, res, next) => {
  const { puesto, descripcion, requisitos, salario } = req.body;
  Offer.update({_id: req.query.offer_id}, { $set: {puesto, descripcion, requisitos, salario }})
  .then((offer) => {
    res.redirect('/');
  })
  .catch((error) => {
    console.log(error);
  })
});*/
module.exports = router;