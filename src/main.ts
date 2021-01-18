import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import db from '@/database';
import '@/registerServiceWorker';
import '@/assets/styles/main.scss';

db.open().catch(e => {
  console.error(`Open failed: ${e}`);
});

createApp(App)
  .use(store)
  .use(router)
  .mount('#app');
