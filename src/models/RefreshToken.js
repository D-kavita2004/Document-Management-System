import mongoose from "mongoose";

const refreshTokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
  }
}, { timestamps: true });

refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // auto-delete expired tokens

const RefreshTokenModel = mongoose.model("RefreshTokenModel", refreshTokenSchema);

export default RefreshTokenModel;
