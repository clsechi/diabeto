<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
  >
    <div
      id="record-form"
      class="q-gutter-md"
    >
      <LocationInput
        :record-location.sync="form.location"
        :readonly="readonly"
        :new-record="newRecord"
      />
      <div>
        <q-input
          v-model="form.time"
          label="Data"
          filled
          :readonly="true"
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
                  :readonly="readonly"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
          <template v-slot:append>
            <q-icon
              name="access_time"
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
                  :readonly="readonly"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <q-input
        v-model.number="form.dextro"
        filled
        autofocus
        clearable
        type="number"
        label="Dextro"
        suffix="mg/dL"
        :readonly="readonly"
      />
      <q-input
        v-model.number="form.carbs"
        filled
        clearable
        type="number"
        label="Carboidratos"
        suffix="g"
        :readonly="readonly"
      />
      <q-input
        v-model.number="form.insulin.meal.value"
        filled
        clearable
        type="number"
        label="Insulina refeição"
        suffix="Units"
        :readonly="readonly"
      />
      <div v-if="!readonly">
        <ButtonsRow
          :values="commonValues"
          @chooseValue="form.insulin.meal.value = $event"
        />
      </div>
      <q-input
        v-model.number="form.insulin.correction.value"
        filled
        clearable
        type="number"
        label="Insulina correção"
        suffix="Units"
        :readonly="readonly"
      />
      <div v-if="!readonly">
        <ButtonsRow
          :values="commonValues"
          @chooseValue="form.insulin.correction.value = $event"
        />
      </div>
      <q-input
        v-model.number="form.insulin.basal.value"
        filled
        clearable
        type="number"
        label="Insulina Basal"
        suffix="Units"
        :readonly="readonly"
      />
      <div v-if="!readonly">
        <ButtonsRow
          :values="commonValues"
          @chooseValue="form.insulin.basal.value = $event"
        />
      </div>
      <q-input
        v-model.trim="form.note"
        filled
        clearable
        autogrow
        type="textarea"
        label="Anotações"
        :readonly="readonly"
      />
      <div class="q-pa-md">
        <q-btn-toggle
          v-model="form.type"
          no-caps
          clearable
          color="grey-4"
          text-color="black"
          toggle-color="primary"
          :options="typeOptions"
          :readonly="readonly"
          :disable="readonly"
        />
      </div>
      <div
        v-if="!readonly"
        class="flex items-center justify-around q-mt-lg"
      >
        <q-btn
          label="Salvar"
          color="positive"
          class="full-width"
          style="max-width: 400px"
          icon="done"
          :loading="loading"
          @click="defineMethod"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { date } from 'quasar';

import ButtonsRow from './ButtonsRow';
import LocationInput from './LocationInput';

const { formatDate } = date;

export default {
  name: 'RecordForm',

  components: {
    ButtonsRow,
    LocationInput,
  },

  props: {
    id: {
      type: String,
      required: false,
      default: null,
    },
    fixedDate: {
      type: String,
      required: false,
      default: null,
    },
    forceReadonly: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      loading: false,
      commonValues: [4, 8, 10, 24],
      form: {},
      typeOptions: [
        { label: 'Café da manhâ', value: 'breakfast' },
        { label: 'Após café', value: 'after_breakfast' },
        { label: 'Almoço', value: 'lunch' },
        { label: 'Após almoço', value: 'after_lunch' },
        { label: 'Jantar', value: 'dinner' },
        { label: 'Após jantar', value: 'after_dinner' },
        { label: 'Antes de deitar', value: 'before_sleep' },
      ],
    };
  },

  computed: {
    ...mapGetters('record', ['records']),

    readonly() {
      return this.forceReadonly || this.$route.name === 'show';
    },

    recordId() {
      return this.id || this.$route.params.id;
    },

    newRecord() {
      return !this.recordId;
    },
  },

  created() {
    this.resetForm();
  },

  beforeMount() {
    if (this.recordId) {
      this.mapForm();
    }
  },

  methods: {
    ...mapActions('record', [
      'createRecord',
      'updateRecord',
    ]),

    getDate() {
      const { date: recordDateQuery } = this.$route.query;
      const recordDate = this.fixedDate || recordDateQuery;
      if (recordDate) {
        const [day, month, year] = recordDate.split('/');
        const asDate = new Date(`20${year}`, month - 1, day);
        return formatDate(asDate, 'HH:mm DD/MM/YY');
      }
      return formatDate(new Date(), 'HH:mm DD/MM/YY');
    },

    mapForm() {
      const record = this.records.find(({ id }) => id === this.recordId);
      if (!record) {
        this.notFoundRecord();
      } else {
        const time = formatDate(record.time, 'HH:mm DD/MM/YY');
        this.form = JSON.parse(JSON.stringify(Object.assign({}, record, { time })));
      }
    },

    notFoundRecord() {
      this.$q.notify({
        message: 'Registro não encontrado!',
      });
      this.$log.error(`Not found record with id: ${this.recordId}`);
      this.router.push({ name: 'records' });
    },

    resetForm() {
      this.form = {
        time: this.getDate(),
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
      };
    },

    async defineMethod() {
      this.loading = true;
      try {
        if (this.recordId) {
          await this.updateRecord(this.form);
        } else {
          await this.createRecord(this.form);
        }
        this.$q.notify({
          color: 'positive',
          message: this.message || 'Sucesso',
        });
        this.$emit('completed');
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

<style lang="stylus">
// #record-form
</style>
