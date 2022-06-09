import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  username: {
    type: String
  },
  age: {
    type: Number,
    min: 0,
    max: 100
  }
}, {
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  },
  toObject: {
    transform: function (doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.__v
    }
  }
})

export default mongoose.model('User', userSchema)
