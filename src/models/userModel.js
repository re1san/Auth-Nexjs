import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  // Usually a good practice is to keep this in ENUMS
  // role: {} but here we can just go like this for simplicity
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
})
// In other frameworks like express whether the cases are handled 
// automatically if the Schema is already present in DB 
// Here, we handle it like below


// If already created use that ||(OR) create new
// Dont write it as models.users name it the same!
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;