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
  location: number;
  player: CombatantState;
  enemy: CombatantState;
}

export interface CombatantState {
  health: number;
  ready: boolean;
  weapon: Weapon;
}

export interface EquipmentState {
  weapon: number;
  head: number;
  chest: number;
  hands: number;
  legs: number;
  feet: number;
}

export interface InventoryState {
  equipment: EquipmentState;
  inventory: ItemsState;
}

export interface ItemsState {
  inventory: Item[];
}

export interface LogState {
  log: string[];
}

// DATABASE

export interface InventoryDB {
  id?: number;
  baseItem: number;
  enchantment: number;
  rating: number;
  skills: number[];
}
