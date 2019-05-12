const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    default:""
  },
  avatar: {
    type: String,
    match: [URL_REGEX, 'Url Inválida'],
    default: "https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2F40.media.tumblr.com%2Fe95a5ec853f0b8fe165171dd179761a0%2Ftumblr_mmsanyJn0d1s2195yo1_500.png&f=1"
  },
  email: {
    type: String,
    required: 'El Email es requerido',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor inserta un email correcto'],
    unique: true
},
  password: {
    type: String,
    required: true,
    minlength: 8
},
  company: {
  type: String,
  default: ""
},
  position: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
