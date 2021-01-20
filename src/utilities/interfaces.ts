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

export interface CombatState {
  health: number;
  ready: boolean;
  weapon: Weapon;
}

export interface State {
  player: CombatState;
  enemy: CombatState;
}

export interface InventoryDB {
  id?: number;
  baseItem: number;
  enchantment: number;
  rating: number;
  skills: number[];
}
