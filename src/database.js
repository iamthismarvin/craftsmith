import Dexie from 'dexie';

const db = new Dexie('database');
db.version(1).stores({
  inventory: `++id, baseItem, enchantment, rating, *skills`,
});

export default db;
