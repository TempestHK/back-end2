import mongoose from 'mongoose';

const additionalFeeSettingsSchema = new mongoose.Schema({
  categories: {
    type: [String],
    required: true,
  },
  fee_code: {
    type: String,
    required: true,
    trim: true,
  },
  fee_name: {
    type: String,
    required: true,
    trim: true,
  },
  unit_measurement: {
    type: String,
    required: true,
    trim: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  fee_amount: {
    type: Number,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdditionalFeeSettings = mongoose.model('AdditionalFeeSettings', additionalFeeSettingsSchema);

export default AdditionalFeeSettings;