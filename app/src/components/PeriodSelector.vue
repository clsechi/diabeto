<template>
  <q-select
    v-if="show"
    filled
    class="full-width"
    color="white"
    dark
    dense
    outlined
    title="Período atual"
    :value="actualPeriod"
    :options="options"
    :loading="loading"
    @input="changePeriod"
  >
    <template v-slot:prepend>
      <q-icon name="date_range" />
    </template>
  </q-select>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'PeriodSelector',

  data() {
    return {
      loading: false,
      options: [{
        value: 7,
        label: '7 dias',
      }, {
        value: 14,
        label: '14 dias',
      }, {
        value: 30,
        label: '30 dias',
      }, {
        value: 60,
        label: '60 dias',
      }, {
        value: 90,
        label: '90 dias',
      }, {
        value: 180,
        label: '180 dias',
      }],
    };
  },

  computed: {
    ...mapGetters('record', ['period']),

    actualPeriod() {
      return this.options.find(({ value }) => value === this.period).label;
    },

    show() {
      return ['app', 'records'].includes(this.$route.name);
    },
  },

  methods: {
    ...mapActions('record', [
      'getRecords',
    ]),

    ...mapMutations('record', [
      'updatePeriod',
    ]),

    async changePeriod({ value }) {
      this.updatePeriod(value);
      try {
        this.loading = true;
        await this.getRecords();
        this.$q.notify({
          icon: 'done',
          color: 'positive',
          message: 'Período atualizado',
        });
      } catch (err) {
        this.$log.error(err);
        this.$q.notify('Erro ao obter registros');
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
