<template>
  <q-page padding>
    <router-view />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',

  computed: {
    ...mapGetters('record', ['records']),
  },
};
</script>
