import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;

// const User = model("User", UserSchema);  this would be normally used if
// we were working with normal always on alway backin server but in next.js is different
//the route is only been created for the time that is called. So  we need to use
//models object provided by mongoose library and stores all the model previous registered
//so we need to check if the model alredy exist to prevent redifining an already  existing model
