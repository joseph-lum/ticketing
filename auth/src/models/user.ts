import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties 
// that are required to create a new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties
// taht a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties 
// that a user Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: { 
    type: String, // From mongoose constructor, NOT typescript 
    required: true
  },
  password: {
    type: String,
    required: true
  }
},{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.pre('save', async function(done){  
  // function command used instead of the ES6 => arrow syntax because 
  // this keyword in function command refers to the user document
  // while => overwrites this in the context of this file
  if(this.isModified('password')){
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };