import { Entry } from './entry';
import { Variant } from './variant';
import { LinkType } from './link';

export class Collection {
  id: number;
  title: string;
  entries: Array<Entry> = [];
  variants: Array<Variant>;
  selectedVariantId: number;
  budget: number;
  weight: number;
}

export const TEST_COLLECTION: Collection = {
  id: 0,
  title: 'Trekking',
  budget: 2000,
  weight: 10000,
  selectedVariantId: 1,
  variants: [
    {
      id: 1,
      name: 'Default',
      entityLinks: [
        {
          linkType: LinkType.ENTRY,
          entityId: 1,
          selectedId: 1
        },
        {
          linkType: LinkType.ENTRY,
          entityId: 2,
          selectedId: 4
        },
        {
          linkType: LinkType.ENTRY,
          entityId: 3,
          selectedId: 5
        },
        {
          linkType: LinkType.ENTRY,
          entityId: 4,
          selectedId: 7
        },
        {
          linkType: LinkType.ENTRY,
          entityId: 5,
          selectedId: 10
        }
      ]
    }
  ],
  entries: [
    {
      id: 1,
      title: 'Rucksack',
      items: [
        {
          id: 1,
          title: 'Tatonka',
          price: 250,
          weight: 2500
        },
        {
          id: 2,
          title: 'Exped 65L',
          price: 200,
          weight: 1600
        },
        {
          id: 3,
          title: 'Deuter',
          price: 250,
          weight: 2800
        }
      ]
    },
    {
      id: 2,
      title: 'Zelt',
      items: [
        {
          id: 4,
          title: 'Hilleberg Enan 1000',
          price: 670,
          weight: 1200
        }
      ]
    },
    {
      id: 3,
      title: 'Isomatte',
      items: [
        {
          id: 5,
          title: 'Exped Synmat HL',
          price: 160,
          weight: 410
        },
        {
          id: 6,
          title: 'Exped Synmat UL',
          price: 140,
          weight: 550
        }
      ],
    },
    {
      id: 4,
      title: 'Schlafsack',
      items: [
        {
          id: 7,
          title: 'Exped 300 UL 9°',
          price: 0,
          weight: 550
        },
        {
          id: 8,
          title: 'Mountain Equipment 650',
          price: 0,
          weight: 1300
        },
        {
          id: 9,
          title: 'Yeti Passion 5 M',
          price: 500,
          weight: 690
        }
      ]
    },
    {
      id: 5,
      title: 'Kocher',
      items: [
        {
          id: 10,
          title: 'Jetboil MicroMo',
          price: 123,
          weight: 400
        }
      ]
    },
    {
      id: 6,
      title: 'Stirnlampe',
      items: [
        {
          id: 11,
          title: 'Petzl Tikka RXP',
          price: 0,
          weight: 115
        },
        {
          id: 12,
          title: 'Petzl Nao+',
          price: 0,
          weight: 185
        }
      ]
    }
  ]
};
