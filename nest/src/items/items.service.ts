import { Injectable } from '@nestjs/common';

class Item {
  name: string;
  level: number;
}

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];

  create(item: Item) {
    this.items.push(item);
  }

  findAll(): Item[] {
    return this.items;
  }
}
