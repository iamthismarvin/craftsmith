// GENERAL

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

// STATE

export interface CombatState {
  health: number;
  ready: boolean;
  weapon: Weapon;
}

export interface InventoryState {
  inventory: ItemsState;
}

export interface ItemsState {
  inventory: Item[];
}

export interface State {
  location: number;
  player: CombatState;
  enemy: CombatState;
}

// DATABASE

export interface InventoryDB {
  id?: number;
  baseItem: number;
  enchantment: number;
  rating: number;
  skills: number[];
}
