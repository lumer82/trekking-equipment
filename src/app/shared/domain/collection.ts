import { Entry } from './entry';

export class Collection {
  id: number;
  title: string;
  entries: Array<Entry> = [];
  budget: number;
  weight: number;
}

export const TEST_COLLECTION: Collection = <Collection>Object.assign(new Collection(), {
  id: 0,
  'title': 'Trekking',
  'budget': 2000,
  'weight': 10000,
  'entries': [
    {
      'title': 'Rucksack',
      'items': [
        {
          'title': 'Tatonka',
          'cost': 250,
          'weight': 2500
        },
        {
          'title': 'Exped 65L',
          'cost': 200,
          'weight': 1600
        },
        {
          'title': 'Deuter',
          'cost': 250,
          'weight': 2800
        }
      ],
      'selectedItem': {'title': 'Tatonka', 'cost': 250, 'weight': 2500}
    },
    {
      'title': 'Zelt',
      'items': [
        {
          'title': 'Hilleberg Enan 1000',
          'cost': 670,
          'weight': 1200
        }
      ],
      'selectedItem': {'title': 'Hilleberg Enan 1000', 'cost': 670, 'weight': 1200}
    },
    {
      'title': 'Isomatte',
      'items': [
        {
          'title': 'Exped Synmat HL',
          'cost': 160,
          'weight': 410
        },
        {
          'title': 'Exped Synmat UL',
          'cost': 140,
          'weight': 550
        }
      ],
      'selectedItem': {'title': 'Exped Synmat HL', 'cost': 160, 'weight': 410}
    },
    {
      'title': 'Schlafsack',
      'items': [
        {
          'title': 'Exped 300 UL 9°',
          'cost': 0,
          'weight': 550
        },
        {
          'title': 'Mountain Equipment 650',
          'cost': 0,
          'weight': 1300
        },
        {
          'title': 'Yeti Passion 5 M',
          'cost': 500,
          'weight': 690
        }
      ],
      'selectedItem': {'title': 'Exped 300 UL 9°', 'cost': 0, 'weight': 550}
    },
    {
      'title': 'Kocher',
      'items': [
        {
          'title': 'Jetboil MicroMo',
          'cost': 123,
          'weight': 400
        }
      ],
      'selectedItem': {'title': 'Jetboil MicroMo', 'cost': 123, 'weight': 400}
    }
  ]
});
