export abstract class EntityRoot<Entity, PrimitiveData> {
  abstract toPrimitives (): PrimitiveData
}
