import { Entry } from './entry';
import { Variant } from './variant';
import { LinkType } from './link';

export class Collection {
  _id: string;
  readonly id?: number;
  settings: {
    title: string;
    budget: number;
    weight: number;
  } = {
    title: '',
    budget: null,
    weight: null
  };
  entries: Array<Entry> = [];
  variants: { [key: string]: Variant };
  selectedVariantId: number;

  constructor() {
    const id = Date.now();
    this.variants = {};
    this.variants[id] = {
        id: id,
        name: 'Default',
        entityLinks: []
      };
    this.selectedVariantId = id;
  }
}

/* tslint:disable */
export const TEST_COLLECTION: Collection = {
  "_id": "59b6d475c18616001292b984",
  "entries": [
    {
      "id": 1505154007516,
      "title": "Rucksack",
      "items": [
        {
          "id": 1505154007545,
          "title": "Exped Backcountry 65 M",
          "price": 320,
          "weight": 1590
        },
        {
          "id": 1505154233162,
          "title": "Exped Thunder 70 W",
          "price": 250,
          "weight": 1590
        }
      ]
    },
    {
      "id": 1505154035595,
      "title": "Zelt",
      "items": [
        {
          "id": 1505154061311,
          "title": "Hilleberg Enan 1000",
          "price": 670,
          "weight": 1200
        }
      ]
    },
    {
      "id": 1505154061308,
      "title": "Isomatte",
      "items": [
        {
          "id": 1505154082828,
          "title": "Exped Synmat HL M",
          "price": 190,
          "weight": 436
        },
        {
          "id": 1505198888207,
          "title": "Exped Synmat HL Winter M",
          "price": 215,
          "weight": 503
        }
      ]
    },
    {
      "id": 1505154082820,
      "title": "Schlafsack",
      "items": [
        {
          "id": 1505154119663,
          "title": "Exped UL 300 9°",
          "price": 0,
          "weight": 590
        },
        {
          "id": 1505154204540,
          "title": "ME Titan 650 -2°",
          "price": 0,
          "weight": 1295
        },
        {
          "id": 1505154233208,
          "title": "Yeti Passion Five -2°",
          "price": 620,
          "weight": 790
        }
      ]
    },
    {
      "id": 1505154232887,
      "title": "Kocher",
      "items": [
        {
          "id": 1505154232916,
          "title": "Jetboil MicroMo",
          "price": 124,
          "weight": 550
        }
      ]
    },
    {
      "id": 1505192981431,
      "title": "Schuhe",
      "items": [
        {
          "id": 1505192981495,
          "title": "Hanwag Badile Combi GTX",
          "price": 230,
          "weight": 1080
        },
        {
          "id": 1505193132951,
          "title": "Lowa Camino GTX",
          "price": 250,
          "weight": 1550
        }
      ]
    },
    {
      "id": 1505200252217,
      "title": "GPS",
      "items": [
        {
          "id": 1505200252360,
          "title": "Garmin Gpsmap 62s",
          "price": 0,
          "weight": 260
        },
        {
          "id": 1505200743255,
          "title": "Garmin Fenix 5X",
          "price": 600,
          "weight": 180
        }
      ]
    },
    {
      "id": 1505200743250,
      "title": "Regenjacke",
      "items": []
    },
    {
      "id": 1505201263720,
      "title": "Regenhose",
      "items": []
    },
    {
      "id": 1505201267408,
      "title": "Gamaschen",
      "items": []
    },
    {
      "id": 1505201269695,
      "title": "Handschuhe",
      "items": []
    },
    {
      "id": 1505201271807,
      "title": "Daunenjacke",
      "items": []
    },
    {
      "id": 1505201283072,
      "title": "Trinkblase",
      "items": [
        {
          "id": 1505201328807,
          "title": "Source Widepack 3L",
          "price": 0,
          "weight": 159
        }
      ]
    }
  ],
  "variants": {
    "1505154007570": {
      "id": 1505154007570,
      "name": "Default",
      "entityLinks": [
        {
          "linkType": 0,
          "entityId": 1505154007516,
          "selectedId": 1505154233162
        },
        {
          "linkType": 0,
          "entityId": 1505154035595,
          "selectedId": 1505154061311
        },
        {
          "linkType": 0,
          "entityId": 1505154061308,
          "selectedId": 1505154082828
        },
        {
          "linkType": 0,
          "entityId": 1505154082820,
          "selectedId": 1505154204540
        },
        {
          "linkType": 0,
          "entityId": 1505154232887,
          "selectedId": 1505154232916
        },
        {
          "linkType": 0,
          "entityId": 1505192981431,
          "selectedId": 1505192981495
        },
        {
          "linkType": 0,
          "entityId": 1505201283072,
          "selectedId": 1505201328807
        },
        {
          "linkType": 0,
          "entityId": 1505200743250,
          "selectedId": null
        },
        {
          "linkType": 0,
          "entityId": 1505201263720,
          "selectedId": null
        },
        {
          "linkType": 0,
          "entityId": 1505201269695,
          "selectedId": null
        },
        {
          "linkType": 0,
          "entityId": 1505201271807,
          "selectedId": null
        },
        {
          "linkType": 0,
          "entityId": 1505200252217,
          "selectedId": 1505200252360
        },
        {
          "linkType": 0,
          "entityId": 1505201267408,
          "selectedId": null
        }
      ]
    }
  },
  "selectedVariantId": 1505154007570,
  "settings": {
    "title": "Wanderung",
    "budget": 2000,
    "weight": 10000
  }
};
