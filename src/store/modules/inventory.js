import enchantItem from '@/utilities/helpers';
import weapons from '@/assets/data/weapons';

export default {
  namespaced: true,
  state: {
    equipment: [
      {
        id: 0,
        name: 'Sword of Beginnings',
        image: 'sword.png',
        rating: 4,
        type: 0,
        attack: { min: 100, max: 200 },
        enchantment: 0,
        description: `Every adventurer has a beginning. This sword will get you started.`,
      },
      {
        id: 1,
        name: 'Greatsword of Beginnings',
        image: 'sword.png',
        rating: 5,
        type: 1,
        attack: { min: 150, max: 250 },
        enchantment: 0,
        description: `Every adventurer has a beginning. This greatsword will get you started.`,
      },
    ],
    items: [],
  },
  getters: {
    equipment: state => {
      return state.equipment;
    },
    items: state => {
      return state.items;
    },
  },
  mutations: {
    createEquipment(state, itemId) {
      const baseEquipment = weapons.find(item => item.id === itemId);
      const newEquipment = { ...baseEquipment };
      newEquipment.id = 2;
      newEquipment.rating = 0;
      newEquipment.enchantment = 0;
      state.equipment.push(newEquipment);
      console.log('Equipment Updated: ', state.equipment);
    },
    enchantEquipment(state, id) {
      const targetItem = state.equipment.find(item => item.id === id);
      const enchantment = enchantItem(targetItem);
      switch (enchantment) {
        case 'ESUCCESS':
          targetItem.enchantment += 1;
          console.log('Enchantment Success');
          break;
        case 'EFAILURE':
          console.log('Enchantment Failure');
          break;
        case 'EMAX':
          console.log('This item has reached max enchantment.');
          break;
        case 'IDNOTAVAILABLE':
          console.log('Item is not available.');
          break;
        default:
          break;
      }
    },
  },
};
