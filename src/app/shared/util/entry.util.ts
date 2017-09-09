import { Entry } from '../domain/entry';
import { Item } from '../domain/item';
import { isNullOrUndefined } from 'util';

export function getSelectedItem(entry: Entry, selectedId: number): Item {
  if (!entry || isNullOrUndefined(selectedId)) {
    return new Item();
  }
  return entry.items.find(i => i.id === selectedId) || new Item();
}
