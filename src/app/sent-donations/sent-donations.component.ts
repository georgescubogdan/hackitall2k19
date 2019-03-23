import { Component, OnInit } from '@angular/core';
import { Donation } from '../models/donation';

@Component({
  selector: 'app-sent-donations',
  templateUrl: './sent-donations.component.html',
  styleUrls: ['./sent-donations.component.sass']
})
export class SentDonationsComponent implements OnInit {
  panelOpenState = false;

  donations: Donation[] = [
    {
      date: Date.now(),
      destination: "test address",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    },
    {
      date: Date.now(),
      destination: "test address 2",
      items: [
        {
          category: "books",
          description: "sunt doar carti"
        },
        {
          category: "mancare",
          description: "doar orez"
        }
      ],
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
