const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    default:"Nombre"
  },
  avatar: {
    type: String,
    match: [URL_REGEX, 'Url Inválida']
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
  default: "Compañia"
},
  position: {
    type: String,
    default: "Puesto"
  },
  city: {
    type: String,
    default: "Ciudad"
  },
  phone: {
    type: String,
    default: "Teléfono"
  },
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
