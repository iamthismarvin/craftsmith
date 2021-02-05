import Dexie from 'dexie';
import { InventoryDB, CharacterDB } from '@/utilities/interfaces';

export class CraftsmithDatabase extends Dexie {
  inventory: Dexie.Table<InventoryDB, number>;

  character: Dexie.Table<CharacterDB, number>;

  constructor() {
    super('CraftsmithDatabase');
    this.version(1).stores({
      inventory: `++id, character, baseItem, enchantment, rating, *skills`,
      character: `++id, name, experience, stats`,
    });
    this.inventory = this.table('inventory');
    this.character = this.table('character');
  }
}

export const db = new CraftsmithDatabase();
