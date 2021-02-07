<template>
  <div>
    <q-field
      v-if="show"
      class="cursor-pointer"
      title="Período atual"
      :loading="loading"
      readonly
      dense
    >
      <template v-slot:prepend>
        <q-icon
          color="white"
          name="date_range"
        />
      </template>
      <template v-slot:control>
        <div class="text-white">
          {{ currentPeriod }}
        </div>
      </template>
      <q-popup-proxy>
        <div
          class="row q-pa-sm flex justify-around bg-grey-3"
          style="max-width:650px"
        >
          <div class="col-12 col-sm-8 flex flex-center">
            <q-date
              v-model="time"
              range
              :landscape="$q.screen.gt.xs"
            />
          </div>
          <div class="col-12 col-sm-4 q-px-sm q-mt-sm">
            <div class="fit row">
              <div
                v-for="option in options"
                :key="option.label"
                class="col-6 col-sm-12 flex justify-center q-pa-xs"
              >
                <q-btn
                  class="full-width"
                  dense
                  outline
                  color="primary"
                  no-caps
                  :label="option.label"
                  @click="handler(option.value)"
                />
              </div>
            </div>
          </div>
        </div>
      </q-popup-proxy>
    </q-field>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { date } from 'quasar';

const DATE_FORMAT = 'DD/MM/YY';

const { formatDate, subtractFromDate } = date;

const mapRange = (days) => {
  const to = formatDate(new Date(), 'YYYY/MM/DD');

  const hours = days * 24;
  // TODO use today hours as 23:59
  const from = formatDate(subtractFromDate(new Date(), { hours }), 'YYYY/MM/DD');

  return {
    to,
    from,
  };
};

export default {
  name: 'PeriodSelector',

  data() {
    return {
      loading: false,
      options: [{
        value: mapRange(7),
        label: 'Últimos 7 dias',
      }, {
        value: mapRange(14),
        label: 'Últimos 14 dias',
      }, {
        value: mapRange(30),
        label: 'Últimos 30 dias',
      }, {
        value: mapRange(60),
        label: 'Últimos 2 mêses',
      }, {
        value: mapRange(90),
        label: 'Últimos 3 mêses',
      }, {
        value: mapRange(180),
        label: 'Últimos 6 mêses',
      }],
      // TODO use first value from options
      time: { from: '2021/01/01', to: '2021/01/03' },
    };
  },

  computed: {
    ...mapGetters('record', ['period']),

    actualPeriod() {
      return this.options.find(({ value }) => value === this.period).label;
    },

    currentPeriod() {
      return `${formatDate(this.time.from, DATE_FORMAT)} - ${formatDate(this.time.to, DATE_FORMAT)}`;
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

    handler(val) {
      console.log('🚀 ~ file: PeriodSelector.vue ~ line 153 ~ handler ~ val', val);
      this.time = val;
    },

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
