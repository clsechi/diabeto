<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
  >
    <q-page id="records-list">
      <div class="row flex justify-center">
        <div
          style="max-width: 400px"
          class="col-12"
        >
          <q-list
            v-for="(day, index) in recordsByDay"
            :key="index"
            class="q-my-sm"
            bordered
            separator
          >
            <q-item-label
              header
              class="text-bold"
            >
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
            </q-item-label>
            <q-slide-item
              v-for="record in day.records"
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
                    bg-color="#95BD3C"
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
          </q-list>
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
import { mapGetters, mapActions } from 'vuex';
import { date } from 'quasar';

import ItemCircle from './components/ItemCircle';

const { formatDate } = date;

// red = #ED7F5A

export default {
  components: {
    ItemCircle,
  },

  computed: {
    ...mapGetters('record', ['records', 'recordsByDay']),
  },

  methods: {
    ...mapActions('record', [
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

    newRecord(formatedDate) {
      this.$router.push({ name: 'new', query: { date: formatedDate } });
    },

    editRecord(id) {
      this.$router.push({ name: 'edit', params: { id } });
    },

    showRecord(id) {
      this.$router.push({ name: 'show', params: { id } });
    },

    formatDate,
  },

};
</script>

<style lang="stylus">
// #records-list
</style>
