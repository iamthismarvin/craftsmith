import weapons from '@/assets/data/weapons';

const helpers = {
  methods: {
    getRatingColor(rating) {
      const colors = ['#ffffff', '#4299e1', '#805ad5', '#dd6b20', '#ffff00', '#ff0000'];
      return colors[rating];
    },
    getRatingName(rating) {
      const names = ['Common', 'Rare', 'Epic', 'Unique', 'Legendary', 'Myth'];
      return names[rating];
    },
    getWeaponType(type) {
      const types = ['Sword', 'Greatsword', 'Staff', 'Bow'];
      return types[type];
    },
    getItemData(item) {
      const assetItem = weapons.find(weapon => weapon.id === item.baseItem);
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
