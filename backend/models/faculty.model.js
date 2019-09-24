const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const facultySchema = new Schema({
  name: { type: String, required: true, refer:'User'},
  department: { type: String, required: true},
  issue_ids: { type: [Number]}
},{
  timestamps: true,
}, { strict: false });

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty;
