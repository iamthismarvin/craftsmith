export interface Item {
  id: number;
  baseItem: number;
  enchantment: number;
  rating: number;
}

interface Attack {
  min: number;
  max: number;
}

export interface Weapon {
  id: number;
  name: string;
  itemType: number;
  type: number;
  image: string;
  attack: Attack;
  description: string;
}

export interface Database {
  inventory: any;
  version: any;
}

export interface InventoryDB {
  id?: number;
  baseItem: number;
  enchantment: number;
  rating: number;
  skills: number[];
}
