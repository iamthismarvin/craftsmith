<template>
  <div>
    <div>This is the Storage view.</div>
    <router-link :to="{ name: 'Item' }">Go to Item View</router-link>
  </div>
</template>

<script>
export default {
  name: 'Storage',
};
</script>
