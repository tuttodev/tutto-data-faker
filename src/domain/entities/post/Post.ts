import { EntityRoot } from '../EntityRoot'
import { UserId } from '../user/valueObjects'
import { PostContent } from './PostContent'
import { PostCreatedAt } from './PostCreatedAt'
import { PostId } from './PostId'

interface PrimitiveData {
  id: string
  userId: string
  content: {
    text: string
  }
  createdAt: Date
}

export class Post extends EntityRoot<Post, PrimitiveData> {
  readonly id: PostId
  readonly userId: UserId
  readonly content: PostContent
  readonly createdAt: PostCreatedAt

  constructor (
    id: PostId,
    userId: UserId,
    content: PostContent,
    createdAt: PostCreatedAt
  ) {
    super()
    this.id = id
    this.userId = userId
    this.content = content
    this.createdAt = createdAt
  }

  static create (id: string, userId: string, text: string, createdAt: Date): Post {
    return new Post(
      new PostId(id),
      new UserId(userId),
      new PostContent(text),
      new PostCreatedAt(createdAt)
    )
  }

  static fromPrimitive (id: string, userId: string, text: string, createdAt: Date): Post {
    return new Post(
      new PostId(id),
      new UserId(userId),
      new PostContent(text),
      new PostCreatedAt(createdAt)
    )
  }

  toPrimitives (): PrimitiveData {
    return {
      id: this.id.value,
      userId: this.userId.value,
      content: {
        text: this.content.text.value
      },
      createdAt: this.createdAt.value
    }
  }
}
