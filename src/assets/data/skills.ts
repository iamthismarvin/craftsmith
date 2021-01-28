import { Skill } from '@/utilities/interfaces';

const skills: Skill[] = [
  {
    id: 0,
    name: 'Horizontal Slash',
    image: 'sword.png',
    type: 'ACTIVE',
    description: 'A basic horizontal slash attack.',
    effect: (weaponAttack: number) => {
      const damage: number = weaponAttack * 2;
      return damage;
    },
  },
  {
    id: 1,
    name: 'Overhand Strike',
    image: 'sword.png',
    type: 'ACTIVE',
    description: 'A crushing two-handed attack.',
    effect: (weaponAttack: number) => {
      const damage: number = weaponAttack * 1.5;
      return damage;
    },
  },
];

export default skills;
