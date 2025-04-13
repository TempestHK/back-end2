import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    customer_company_id: {
      type: Number,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    user_type: {
      type: Number,
      required: true,
    },
    city_id: {
      type: Number,
      required: true,
    },
    profile_id: {
      type: Number,
      required: true,
    },
    district_id: {
      type: Number,
      required: true,
    },
    agency_id: {
      type: Number,
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.Mixed, // or Schema.Types.ObjectId if referencing another collection
      required: true,
    },
    role_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const User = mongoose.model("User", userSchema);

export default User;
