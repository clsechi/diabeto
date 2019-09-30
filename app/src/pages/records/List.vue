<template>
  <q-page>
    <q-timeline
      color="black"
      class="q-px-lg q-pb-md"
    >
      <q-timeline-entry
        v-for="record in records"
        :key="record.id"
        color="orange"
        :subtitle="formatDate(record.createdAt, 'HH:mm:ss')"
      >
        <q-slide-item
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
          <div>Carbs: {{ record.carbs }}</div>
          <div>Dextro: {{ record.dextro || '--' }}</div>
          <div>Insulina Refeição: {{ record.insulin.meal.value || '--' }}</div>
          <div>Insulina Correção: {{ record.insulin.correction.value || '--' }}</div>
          <div>Insulina Basal: {{ record.insulin.basal.value || '--' }}</div>
        </q-slide-item>
      </q-timeline-entry>
    </q-timeline>
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
import { mapGetters, mapActions } from 'vuex';
import { date } from 'quasar';

const { formatDate } = date;

export default {
  computed: {
    ...mapGetters('record', ['records']),
  },

  async created() {
    await this.getRecords();
  },

  methods: {
    ...mapActions('record', [
      'getRecords',
      'deleteRecord',
    ]),

    async confirmDeleteRecord(id) {
      try {
        await this.deleteRecord(id);
      } catch (error) {
        this.$log.error(error);
        this.$q.notify('Algo deu errado');
      }
    },

    editRecord(id) {
      this.$router.push({ name: 'edit', params: { id } });
    },

    formatDate,
  },

};
</script>
