<template>
  <div class="q-gutter-md form-size">
    <div>
      <q-input
        v-model="form.time"
        filled
      >
        <template v-slot:prepend>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="form.time"
                mask="HH:mm DD/MM/YY"
              />
            </q-popup-proxy>
          </q-icon>
        </template>

        <template v-slot:append>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                v-model="form.time"
                mask="HH:mm DD/MM/YY"
                format24h
                now-btn
              />
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <q-input
      v-model="form.dextro"
      filled
      clearable
      type="number"
      label="Dextro"
      suffix="mg/dL"
    />
    <q-input
      v-model="form.carbs"
      filled
      clearable
      type="number"
      label="Carboidratos"
      suffix="g"
    />
    <q-input
      v-model="form.insulin.correction.value"
      autofocus
      filled
      clearable
      type="number"
      label="Insulina correção"
      suffix="Units"
    />
    <div class="flex justify-around q-mt-sm">
      <div
        v-for="value in commonValues"
        :key="value"
      >
        <q-btn
          color="orange-8"
          round
          size="12px"
          :label="value"
          @click="form.insulin.correction.value = value"
        />
      </div>
    </div>
    <q-input
      v-model="form.insulin.meal.value"
      filled
      clearable
      type="number"
      label="Insulina refeição"
      suffix="Units"
    />
    <div class="flex justify-around q-mt-sm">
      <div
        v-for="value in commonValues"
        :key="value"
      >
        <q-btn
          color="orange-8"
          round
          size="12px"
          :label="value"
          @click="form.insulin.meal.value = value"
        />
      </div>
    </div>
    <q-input
      v-model="form.insulin.basal.value"
      filled
      clearable
      type="number"
      label="Insulina Basal"
      suffix="Units"
    />
    <div class="flex justify-around q-mt-sm">
      <div
        v-for="value in commonValues"
        :key="value"
      >
        <q-btn
          color="orange-8"
          round
          size="12px"
          :label="value"
          @click="form.insulin.basal.value = value"
        />
      </div>
    </div>
    <q-input
      v-model="form.note"
      filled
      clearable
      autogrow
      type="textarea"
      label="Anotações"
    />
    <div class="flex items-center justify-around q-mt-lg">
      <q-btn
        label="Salvar"
        color="positive"
        :loading="loading"
        @click="defineMethod"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { date } from 'quasar';

const { formatDate } = date;

export default {
  name: 'RecordForm',

  data() {
    return {
      loading: false,
      commonValues: [4, 8, 10, 18],
      form: {
        time: formatDate(new Date(), 'HH:mm DD/MM/YY'),
        location: null,
        type: null,
        carbs: null,
        dextro: null,
        note: null,
        tags: [],
        images: [],
        insulin: {
          basal: {
            type: 'glargina',
            commonName: 'Lantus',
            value: null,
          },
          correction: {
            type: 'humalog',
            commonName: 'Lispro',
            value: null,
          },
          meal: {
            type: 'humalog',
            commonName: 'Lispro',
            value: null,
          },
        },
      },
    };
  },

  computed: {
    ...mapGetters('record', ['records']),
  },

  methods: {
    ...mapActions('record', [
      'createRecord',
      'updateRecord',
      'getRecords',
    ]),

    async defineMethod() {
      this.loading = true;
      try {
        if (this.id) {
          await this.updateRecord(this.form);
        } else {
          await this.createRecord(this.form);
        }
        this.$q.notify({
          color: 'positive',
          message: this.message || 'Sucesso',
        });
        this.$router.push({ name: 'records' });
      } catch (err) {
        this.$log.error('defineMethod', err);
        this.$q.notify({
          message: 'Ocorreu um erro!',
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
