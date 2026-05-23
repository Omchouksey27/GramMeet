// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   email: { type: String, required: true, unique: true, lowercase: true },
//   mobile: { type: String, required: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ['sachiv', 'sarpanch', 'ward_member'],
//     required: true,
//   },
//   wardArea: { type: String }, // only for ward_member
//   isActive: { type: Boolean, default: true },
//   preferredLanguage: { type: String, enum: ['en', 'hi'], default: 'hi' },
// }, { timestamps: true });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// userSchema.methods.matchPassword = function (pass) {
//   return bcrypt.compare(pass, this.password);
// };

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['sachiv', 'sarpanch', 'ward_member'],
    required: true,
  },
  wardArea: { type: String },
  isActive: { type: Boolean, default: true },
  preferredLanguage: { type: String, enum: ['en', 'hi'], default: 'hi' },
}, { timestamps: true });

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);