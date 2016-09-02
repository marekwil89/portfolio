var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var validator = require('validator');
var transporter = nodemailer.createTransport('smtps://dlaczegomamywierzyc%40gmail.com:manta123@smtp.gmail.com');


function validate(req, res, next){

  var errors = [];

  if(!req.body.name || !req.body.email || !req.body.text)
  {
    errors.push('Uzupełnij Wszystkie Pola')
    return res.json({
      status: 'alert',
      response: errors
    })
  }
  if(validator.isLength(req.body.name, {min: 1, max: 30}) === false){
   errors.push('pole IMIE nie może przekraczać 30 znaków')

  }
  if(validator.isEmail(req.body.email) === false){
   errors.push('Nieprawidłowy format pola EMAIL');

  }
  if(validator.isLength(req.body.email, {min: 1, max: 50}) === false){
   errors.push('Pole EMAIL nie może przekraczać 50 znaków')

  }
  if(validator.isLength(req.body.text, {min: 1, max: 200}) === false){
   errors.push('Pole WIADOMOŚĆ nie może przekraczać 200 znaków')

  }
  if(errors.length === 0){
    next()
    return;
  }

  return res.json({
    status: 'alert',
    response: errors
  })

}


router.use('/post', validate);

router.route('/post').post(function(req, res){



  var mailOptions = {
    from: req.body.email,
    to: 'dlaczegomamywierzyc@gmail.com',
    subject: 'WidĹşmiĹ„skie zlecenie' + ' od ' + req.body.name + ' <'+req.body.email+'/>', 
    text: req.body.text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      return console.log(error);
    }
    return res.json({
      status: 'success',
      response: 'Wiadomość została wysłana'
    });
  });

})


module.exports = router;