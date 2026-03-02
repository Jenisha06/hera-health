const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  age: { type: Number },
  lastPeriodDate: { type: Date },
  initialSymptoms: [{ type: String }],
  emergencyContacts: [
    {
      name: { type: String },
      phone: { type: String }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);