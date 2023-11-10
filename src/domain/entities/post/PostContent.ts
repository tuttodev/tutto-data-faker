import { ContentText } from './ContentText'

export class PostContent {
  readonly text: ContentText

  constructor (text: string) {
    this.text = new ContentText(text)
  }
}
