import { User } from '@domain/entities/user/User'
import { Nullable } from '@domain/Nullable'
import { UserRepository } from '@domain/repositories/UserRepository'

export class UserRepositoryMock implements UserRepository {
  private readonly getAllMock: jest.Mock
  private readonly saveMock: jest.Mock
  private readonly getByUserNameMock: jest.Mock
  private readonly updateMock: jest.Mock
  private readonly deleteMock: jest.Mock
  private readonly getByIdMock: jest.Mock

  constructor () {
    this.getAllMock = jest.fn()
    this.saveMock = jest.fn()
    this.getByUserNameMock = jest.fn()
    this.updateMock = jest.fn()
    this.deleteMock = jest.fn()
    this.getByIdMock = jest.fn()
  }

  async getAll (): Promise<User[]> {
    return this.getAllMock()
  }

  async save (user: User): Promise<User> {
    return this.saveMock(user)
  }

  async getByUserName (username: string): Promise<Nullable<User>> {
    return this.getByUserNameMock(username)
  }

  returnOnGetByUserName (user: Nullable<User>): void {
    this.getByUserNameMock.mockReturnValueOnce(user)
  }

  async update (user: User): Promise<User> {
    return this.updateMock(user)
  }

  async delete (user: User): Promise<void> {
    return this.deleteMock(user)
  }

  async getById (id: string): Promise<Nullable<User>> {
    return this.getByIdMock(id)
  }

  returnOnGetById (user: Nullable<User>): void {
    this.getByIdMock.mockReturnValueOnce(user)
  }
}
