import { EntryLink, LinkTypes } from './link';

export class Variant {
  readonly id: number = Date.now();
  readonly name: string;
  readonly entityLinks: Array<LinkTypes>;
}
