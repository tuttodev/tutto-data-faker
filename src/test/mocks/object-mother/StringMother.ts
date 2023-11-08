import { faker } from '@faker-js/faker'

export class StringMother {
  static random (config: { length: number }): string {
    return faker.string.alpha({
      length: config.length
    })
  }
}
