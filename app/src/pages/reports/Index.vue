<template>
  <q-page padding>
    <div
      id="reports"
      class="row"
    >
      <div class="col-12 col-md-4">
        <div class="row">
          <div class="col-12 flex justify-center">
            <h5>Selecione o período:</h5>
          </div>
          <div class="col-12 flex justify-center">
            <q-date
              v-model="period"
              range
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4">
        <div class="row">
          <div class="col-12 flex justify-center">
            <h5>Selecione o tipo de relatório:</h5>
          </div>
          <div class="col-12 flex justify-center">
            <q-radio
              v-model="type"
              val="deise_dutra"
              label="Dra. Deise Dutra"
            />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 flex flex-center q-my-xl">
        <q-btn
          label="Criar relatório"
          color="primary"
        />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'ReportsIndex',

  data() {
    return {
      period: null,
      type: null,
    };
  },

  methods: { },
};
</script>

<style lang="stylus">
#reports
  .list
    width 90vw
    max-width 500px
</style>
