import { Item } from './item';

export class Entry {
  id: number = Date.now();
  title: string = null;
  items: Array<Item> = [];
}
