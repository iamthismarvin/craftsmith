import Dexie from 'dexie';
import { InventoryDB, UserDB } from '@/utilities/interfaces';

export class CraftsmithDatabase extends Dexie {
  inventory: Dexie.Table<InventoryDB, number>;

  user: Dexie.Table<UserDB, number>;

  constructor() {
    super('CraftsmithDatabase');
    this.version(1).stores({
      inventory: `++id, baseItem, enchantment, rating, *skills`,
      user: `++id, name, experience, stats`,
    });
    this.inventory = this.table('inventory');
    this.user = this.table('user');
  }
}

export const db = new CraftsmithDatabase();
