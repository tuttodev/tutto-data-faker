import { createUser } from './user/createUser.controller'
import { getAllUsers } from './user/getAllUsers.controller'
import { updateUser } from './user/updateUser.controller'
import { deleteUser } from './user/deleteUser.controller'

export {
  createUser as createUserController,
  getAllUsers as getAllUsersController,
  updateUser as updateUserController,
  deleteUser as deleteUserController
}
