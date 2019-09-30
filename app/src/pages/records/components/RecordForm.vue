<template>
  <div class="q-gutter-md form-size">
    <q-input
      v-model="form.dextro"
      filled
      clearable
      type="number"
      label="Dextro"
    />
    <q-input
      v-model="form.carbs"
      autofocus
      filled
      clearable
      type="number"
      label="Carboidratos"
    />
    <q-input
      v-model="form.insulin.correction.value"
      autofocus
      filled
      clearable
      type="number"
      label="Insulina correção"
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
      autofocus
      filled
      clearable
      type="number"
      label="Insulina refeição"
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
      autofocus
      filled
      clearable
      type="number"
      label="Insulina Basal"
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
      autofocus
      filled
      clearable
      autogrow
      type="textarea"
      label="Anotações"
    />
    <div class="flex items-center justify-around q-mt-lg">
      <q-btn
        label="Voltar"
        color="primary"
        @click="$router.go(-1)"
      />
      <q-btn
        label="Salvar"
        color="positive"
        :loading="loading"
        @click="validateAndCreateRecord"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageIndex',

  data() {
    return {
      loading: false,
      commonValues: [4, 8, 10, 18],
      form: {
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

    async validateAndCreateRecord() {
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
        this.$router.push({ name: 'app' });
      } catch (err) {
        this.$log.error('validateAndCreateRecord', err);
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
