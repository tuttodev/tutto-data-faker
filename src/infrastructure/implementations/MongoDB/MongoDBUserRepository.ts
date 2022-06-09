import { User } from '@domain/entities/User'
import { UserRepository } from '@domain/repositories/UserRepository'
import UserModel from './models/UserModel'

export class MongoDBUserRepository implements UserRepository {
  async getAll (): Promise<User[]> {
    const users = await UserModel.find()
    return users
  }

  async save (user: User): Promise<User> {
    const userToSave = new UserModel(user)
    const userSaved = await userToSave.save()
    console.log(userSaved)
    return userSaved
  }

  async getByUserName (username: string): Promise<User | null> {
    const user = await UserModel.findOne({ username })
    return user
  }

  async update (user: User): Promise<User> {
    await UserModel.updateOne({ _id: user.id }, user)
    return user
  }

  async delete (user: User): Promise<void> {
    await UserModel.deleteOne({ _id: user.id })
  }

  async getById (id: string): Promise<User | null> {
    const user = await UserModel.findOne({ _id: id })
    return user
  }
}
