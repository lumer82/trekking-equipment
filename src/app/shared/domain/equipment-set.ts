import { Collection } from './collection';

export class EquipmentSet {
  _id: string;
  name: string;
  collections: {
    [id: number]: {
      collection: Collection;
      order: number;
    }
  } = {};
}
