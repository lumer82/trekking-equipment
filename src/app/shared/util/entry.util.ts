import { Entry } from '../domain/entry';
import { Item } from '../domain/item';
import { isNullOrUndefined } from 'util';

export function getSelectedItem(entry: Entry): Item {
  if (!entry || isNullOrUndefined(entry.selectedItemId)) {
    return new Item();
  }
  return entry.items.find(i => i.id === entry.selectedItemId) || new Item();
}
