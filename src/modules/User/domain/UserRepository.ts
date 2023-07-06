
import { Nullable } from '@shared/domain/Nullable'
import { User } from './User'

export interface UserRepository {
  getAll: () => Promise<User[]>
  save: (user: User) => Promise<User>
  getByUserName: (username: string) => Promise<Nullable<User>>
  update: (user: User) => Promise<User>
  delete: (user: User) => Promise<void>
  getById: (id: string) => Promise<Nullable<User>>
}
