const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let validator = require('validator');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minLength: 3 },
  password: { type: Schema.Types.Mixed, required: true, trim: true, minLength: 5},
  email: { type: String, required: true, unique: true, lowercase: true, validate: (value) => {
      return validator.isEmail(value) },
    },
  dashCode: { type: Number, required: true}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
