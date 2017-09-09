export abstract class Link {
  abstract readonly linkType: LinkType;
  readonly entityId: number;
  readonly selectedId: number;
}

export class EntryLink extends Link {
  readonly linkType: LinkType = LinkType.ENTRY;
}

export class CollectionLink extends Link {
  readonly linkType: LinkType = LinkType.COLLECTION;
}

export type LinkTypes = EntryLink | CollectionLink;

export enum LinkType {
  ENTRY,
  COLLECTION
}
