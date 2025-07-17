import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'User'], required: true },
  customerId: { type: String, required: true },
});

export default mongoose.model('User', UserSchema);
