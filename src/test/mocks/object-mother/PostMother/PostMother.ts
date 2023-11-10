import { Post } from '@domain/entities/post/Post'
import { faker } from '@faker-js/faker'

interface PostParams {
  id: string
  userId: string
  text: string
  createdAt: Date
}

export class PostMother {
  static create (params?: Partial<PostParams>): Post {
    const defaultParams: PostParams = {
      id: faker.string.uuid(),
      userId: faker.string.uuid(),
      text: faker.string.alpha({
        length: 20
      }),
      createdAt: faker.date.anytime(),
      ...params
    }

    return Post.fromPrimitive(
      defaultParams.id,
      defaultParams.userId,
      defaultParams.text,
      defaultParams.createdAt
    )
  }

  static withMoreThanFiftyCharacters (): Post {
    return this.create({
      text: faker.string.alpha({
        length: {
          min: 51,
          max: 100
        }
      })
    })
  }
}
