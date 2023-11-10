import { faker } from '@faker-js/faker'

export class NumberMother {
  static random (config: { min: number, max: number }): number {
    return faker.number.int(config)
  }

  static randomAge (): number {
    return faker.number.int({
      min: 1,
      max: 100
    })
  }
}
