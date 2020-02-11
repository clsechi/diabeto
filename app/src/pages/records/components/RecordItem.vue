<template>
  <div>
    <q-item-label
      header
      class="text-bold"
    >
      <div class="column">
        <div class="flex justify-between items-center">
          <div> {{ day.formatedDate }} </div>
          <q-btn
            icon="add"
            dense
            rounded
            outline
            size="sm"
            color="secondary"
            @click="newRecord(day.formatedDate)"
          />
        </div>
        <div class="q-mt-md">
          <LineChart
            :records="day.records"
          />
        </div>
      </div>
    </q-item-label>
    <q-slide-item
      v-for="record in day.records"
      :ref="`slider-${record.id}`"
      :key="record.id"
      left-color="blue"
      right-color="red"
      @left="editRecord(record.id)"
      @right="confirmDeleteRecord(record.id)"
    >
      <template v-slot:left>
        <q-icon name="edit" />
      </template>
      <template v-slot:right>
        <q-icon name="delete" />
      </template>
      <q-item
        v-ripple
        clickable
        @click="showRecord(record.id)"
      >
        <q-item-section class="text-bold">
          {{ formatDate(record.time, 'HH:mm') }}
        </q-item-section>
        <q-item-section>
          <ItemCircle
            :value="record.dextro"
            unit="mg/dL"
            :bg-color="defineColor(record.dextro)"
            shape="circle"
          />
        </q-item-section>
        <q-item-section>
          <ItemCircle
            :value="record.carbs"
            unit="g"
            bg-color="#B1830A"
            shape="square"
          />
        </q-item-section>
        <q-item-section>
          <ItemCircle
            :value="record.insulin.meal.value"
            unit="Units"
            bg-color="#6b6fe3"
            shape="drop"
          />
        </q-item-section>
        <q-item-section>
          <ItemCircle
            :value="record.insulin.correction.value"
            unit="Units"
            bg-color="#996be3"
            shape="drop"
          />
        </q-item-section>
        <q-item-section>
          <ItemCircle
            :value="record.insulin.basal.value"
            unit="Units"
            bg-color="#37A394"
            shape="drop-reverse"
          />
        </q-item-section>
      </q-item>
    </q-slide-item>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { date } from 'quasar';

import ItemCircle from './ItemCircle';
import LineChart from './LineChart';

const { formatDate } = date;

export default {
  components: {
    ItemCircle,
    LineChart,
  },

  props: {
    day: {
      required: true,
      type: Object,
    },
  },

  computed: {
    ...mapGetters('user', ['maxTarget', 'minTarget']),
  },

  methods: {
    ...mapActions('record', [
      'deleteRecord',
    ]),

    formatDate,

    defineColor(val) {
      if (val >= this.maxTarget || val <= this.minTarget) return '#ED7F5A';
      return '#95BD3C';
    },

    confirmDeleteRecord(id) {
      this.$q.dialog({
        title: 'Confirme',
        message: 'Deletar permanentemente o registro?',
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        try {
          await this.deleteRecord(id);
        } catch (error) {
          this.$log.error(error);
          this.$q.notify('Algo deu errado');
        }
      }).onCancel(() => {
        const [sliderRef] = this.$refs[`slider-${id}`];
        sliderRef.reset();
      });
    },

    newRecord(formatedDate) {
      this.$router.push({ name: 'new', query: { date: formatedDate } });
    },

    editRecord(id) {
      this.$router.push({ name: 'edit', params: { id } });
    },

    showRecord(id) {
      this.$router.push({ name: 'show', params: { id } });
    },
  },
};
</script>
