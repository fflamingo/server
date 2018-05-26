import { EntityField } from './EntityField';

export type EntityFieldsDescriptor = {
  [key: string]: string | EntityField | Entity<any>;
};

export interface EntityDescriptor<T extends EntityFieldsDescriptor> {
  fields: T;
}

export class Entity<T extends EntityFieldsDescriptor> {
  fields: { [K in keyof T]: T[K] extends string ? EntityField : T[K] };

  constructor(descriptor: EntityDescriptor<T>) {
    this.fields = {} as any;
    Object.keys(descriptor.fields).forEach((key: keyof T) => {
      this.fields[key] =
        typeof descriptor.fields[key] === 'string'
          ? (new EntityField() as any)
          : descriptor.fields[key];
    });
  }
}
