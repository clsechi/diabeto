<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
  >
    <q-page
      id="dashboard"
      padding
    >
      <div class="row">
        <div class="col-6">
          <StatsCard
            title="Glicemia média"
            :value="stats.total.average"
          />
        </div>
        <div class="col-6">
          <StatsCard
            title="Dextro mais alto"
            :value="stats.total.higher"
          />
        </div>
        <div class="col-6">
          <StatsCard
            title="Dextro mais baixo"
            :value="stats.total.lower"
          />
        </div>
        <div class="col-6">
          <StatsCard
            title="Eventos de hipo"
            :value="stats.total.hypoEvents"
          />
        </div>
        <div class="col-6">
          <StatsCard
            title="Eventos de hiper"
            :value="stats.total.hyperEvents"
          />
        </div>
        <!-- <div class="col-6">
          <StatsCard
            title="Média teste p/ dia"
            :value="0"
          />
        </div> -->
        <div class="col-6">
          <StatsCard
            title="Total dextros"
            :value="stats.total.count"
          />
        </div>
        <div class="col-12 q-my-md">
          <div class="q-mb-sm text-center text-weight-medium">
            Glicose média/Dia
          </div>
          <LineChart
            id="dextro"
            time-format="D/MM"
            :records="stats.days"
          />
        </div>
        <div class="col-12 q-my-md">
          <div class="q-mb-sm text-center text-weight-medium">
            Glicose média/Hora
          </div>
          <LineChart
            id="dextro"
            time-format="HH'"
            :records="stats.hour"
          />
        </div>
        <div class="col-12 q-my-md">
          <div class="q-mb-sm text-center text-weight-medium">
            Glicose/hora
          </div>
          <ScatterChart
            id="all-dextros"
            :records="records"
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
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import StatsCard from './components/StatsCard';
import LineChart from './components/LineChart';
import ScatterChart from './components/ScatterChart';

export default {
  name: 'DashboardIndex',

  components: {
    StatsCard,
    LineChart,
    ScatterChart,
  },

  computed: {
    ...mapGetters('record', ['stats', 'records']),
  },
};
</script>

<style lang="stylus">
// #dashboard
//   background-color #D3D3D3
</style>
