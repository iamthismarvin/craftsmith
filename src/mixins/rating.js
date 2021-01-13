const ratingMixins = {
  computed: {
    ratingColor() {
      return this.getRatingColor(this.item.rating);
    },
  },
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
  },
};

export default ratingMixins;
