// GENERAL

interface Attack {
  min: number;
  max: number;
}

export interface Combatant {
  health: { max: number; remaining: number };
  ready: boolean;
  weapon: Weapon;
}

export interface Dungeon {
  id: Number;
  name: String;
  description: String;
  monsterID: number;
}

export interface Equipment {
  weapon: number;
  head: number;
  chest: number;
  hands: number;
  legs: number;
  feet: number;
}

export interface Item {
  id: number;
  character: number;
  baseItem: number;
  enchantment: number;
  rating: number;
}

export type Inventory = Item[];

export type Monster = {
  id: number;
  name: String;
  weaponID: number;
};

export interface Skill {
  id: number;
  name: string;
  image: string;
  type: string;
  description: string;
  effect: Function;
}

export interface Stats {
  dexterity: number;
  intelligence: number;
  stamina: number;
  strength: number;
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
  player: Combatant;
  enemy: Combatant;
}

export interface InventoryState {
  equipment: Equipment;
  inventory: Inventory;
}

export interface LogState {
  log: string[];
}

export interface CharacterState {
  id: number;
  name: string;
  experience: number;
  stats: Stats;
}

// DATABASE

export interface InventoryDB {
  id?: number;
  character: number;
  baseItem: number;
  enchantment: number;
  rating: number;
  skills: number[];
}

export interface CharacterDB {
  id?: number;
  name: string;
  experience: number;
  stats: Stats;
}
