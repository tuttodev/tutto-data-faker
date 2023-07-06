import { userMutations, userQueries } from './user'

const resolvers = {
  Query: {
    ...userQueries
  },
  Mutation: {
    ...userMutations
  }
}

export default resolvers
