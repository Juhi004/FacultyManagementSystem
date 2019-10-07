const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
  department: {type: String, required: true},
  facultyName: {type: String, ref:'User', required: true},
  subject: {type: String, required: true, trim: true},
  time : {type: String,required : true},
  date: {type: String, required: true},
  remarks: {type: String},
  status: {type: String }
},{
  timestamps: true,
}, { strict: false });

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
