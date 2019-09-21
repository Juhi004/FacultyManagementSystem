const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const issueSchema = new Schema({
  department: {type: String, required: true},
  subject: {type: String, required: true, trim: true},
  date: {type: Date, required: true},
  //not sure about the datat tupe Time, want a data type that will accept numbers, ":" and "-"
  time_slot: {type: Number, required: true},
  reason: {type: String, trim: true},
  status: {type: String, enum: ['Accepted', 'Rejected', 'Pending by HOD', 'Not Responded by faculty']},
  comments: {type: String}
},{
  timestamps: true,
});

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;
