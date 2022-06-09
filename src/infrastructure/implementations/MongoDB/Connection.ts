import mongoose from 'mongoose'

export class Connection {
  async connect (): Promise<void> {
    await mongoose.connect('mongodb+srv://tuttodev:tuttodev@cluster0.med9i5j.mongodb.net/?retryWrites=true&w=majority')
    console.log('MongoDB connected ... ')
  }
}
