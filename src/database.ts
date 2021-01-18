import Dexie from 'dexie';
import { InventoryDB } from '@/utilities/interfaces';

export class CraftsmithDatabase extends Dexie {
  inventory: Dexie.Table<InventoryDB, number>;

  constructor() {
    super('CraftsmithDatabase');
    this.version(1).stores({
      inventory: `++id, baseItem, enchantment, rating, *skills`,
    });
    this.inventory = this.table('inventory');
  }
}

export const db = new CraftsmithDatabase();
