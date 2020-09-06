<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { setLastStatus } from 'src/helpers/darkMode';

export default {
  name: 'App',

  beforeMount() {
    setLastStatus();
  },
};
</script>

<style>
</style>
