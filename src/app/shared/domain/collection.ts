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
          'id': 1,
          'title': 'Tatonka',
          'cost': 250,
          'weight': 2500
        },
        {
          'id': 2,
          'title': 'Exped 65L',
          'cost': 200,
          'weight': 1600
        },
        {
          'id': 3,
          'title': 'Deuter',
          'cost': 250,
          'weight': 2800
        }
      ],
      'selectedItemId': 1
    },
    {
      'title': 'Zelt',
      'items': [
        {
          'id': 4,
          'title': 'Hilleberg Enan 1000',
          'cost': 670,
          'weight': 1200
        }
      ],
      'selectedItemId': 4
    },
    {
      'title': 'Isomatte',
      'items': [
        {
          'id': 5,
          'title': 'Exped Synmat HL',
          'cost': 160,
          'weight': 410
        },
        {
          'id': 6,
          'title': 'Exped Synmat UL',
          'cost': 140,
          'weight': 550
        }
      ],
      'selectedItemId': 5
    },
    {
      'title': 'Schlafsack',
      'items': [
        {
          'id': 7,
          'title': 'Exped 300 UL 9°',
          'cost': 0,
          'weight': 550
        },
        {
          'id': 8,
          'title': 'Mountain Equipment 650',
          'cost': 0,
          'weight': 1300
        },
        {
          'id': 9,
          'title': 'Yeti Passion 5 M',
          'cost': 500,
          'weight': 690
        }
      ],
      'selectedItemId': 7
    },
    {
      'title': 'Kocher',
      'items': [
        {
          'id': 10,
          'title': 'Jetboil MicroMo',
          'cost': 123,
          'weight': 400
        }
      ],
      'selectedItemId': 10
    }
  ]
});
