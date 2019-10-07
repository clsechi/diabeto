<template>
  <q-page
    id="dashboard"
    padding
  >
    <div class="row">
      <div class="col-6">
        <StatsCard
          title="Registros"
          :value="stats"
        />
      </div>
      <div class="col-6">
        <StatsCard
          title="Registros"
          :value="stats"
        />
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
import StatsCard from './components/StatsCard';

export default {
  name: 'DashboardIndex',

  components: {
    StatsCard,
  },

  computed: {
    ...mapGetters('record', ['stats']),
  },
};
</script>

<style lang="stylus">
// #dashboard
//   background-color #D3D3D3
</style>
