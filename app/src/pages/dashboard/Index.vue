<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 flex flex-center">
        <p>Registros: {{ stats }}</p>
      </div>
    </div>
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        fab
        icon="add"
        color="secondary"
        @click="$router.push({ name: 'new' })"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageIndex',

  computed: {
    ...mapGetters('record', ['stats']),
  },
};
</script>
