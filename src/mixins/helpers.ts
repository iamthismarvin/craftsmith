import weapons from '@/assets/data/weapons';
import { Item } from '@/utilities/interfaces';

const helpers = {
  methods: {
    getRatingColor(rating: number) {
      const colors = ['#ffffff', '#4299e1', '#805ad5', '#dd6b20', '#ffff00', '#ff0000'];
      return colors[rating];
    },
    getRatingName(rating: number) {
      const names = ['Common', 'Rare', 'Epic', 'Unique', 'Legendary', 'Myth'];
      return names[rating];
    },
    getWeaponType(type: number) {
      const types = ['Sword', 'Greatsword', 'Staff', 'Bow'];
      return types[type];
    },
    getItemData(item: Item) {
      const assetItem = weapons.find(weapon => weapon.id === item.baseItem);
      if (!assetItem) {
        throw console.log('Item data not found.');
      }
      const itemData = {
        id: item.id,
        enchantment: item.enchantment,
        rating: item.rating,
        name: assetItem.name,
        itemType: assetItem.itemType,
        type: assetItem.type,
        image: assetItem.image,
        attack: assetItem.attack,
        description: assetItem.description,
      };
      return itemData;
    },
  },
};

export default helpers;
