import mongoose from 'mongoose';

const RentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  cars: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Posts',
  },
  rentTime: {
    type: String,
    required: true,
    trim: true,
  },
  rentCar: {
    type: String,
    required: true,
    trim: true,
  },
  return: {
    type: Boolean,
    required: true,
    trim: true,
  },
});

export default mongoose.model('Rent', RentSchema);
