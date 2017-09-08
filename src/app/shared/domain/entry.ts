import { Item } from './item';

export class Entry {
  title: string = null;
  items: Array<Item> = [];
  selectedItemId: number = null;
}
