const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hodSchema = new Schema({
  name: { type: String, required: true, refer:"User"},
  department: { type: String, required: true, unique: true, refer:'Issues'},
},{
  timestamps: true,
});

const HOD = mongoose.model('HOD', hodSchema);

module.exports = HOD;
