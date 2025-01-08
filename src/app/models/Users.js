import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    /*cars: {
      type: String,
      required: true,
      trim: true,
    },*/
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', async function save(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

UserSchema.methods.comparePassword = async function comparePassword(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
