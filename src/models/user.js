const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const { Schema } = mongoose;

const userSchema = new Schema({
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
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword= function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);
