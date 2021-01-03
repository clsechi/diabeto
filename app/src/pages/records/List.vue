<template>
  <div>
    <transition
      appear
      enter-active-class="animated fadeIn"
    >
      <q-page id="records-list">
        <div class="row flex justify-center">
          <div
            style="max-width: 500px"
            class="col-12"
          >
            <div
              v-if="!recordsByDay.length"
              class="q-mt-xl text-center text-h6"
            >
              Nenhum registro encontrado :(
            </div>
            <q-infinite-scroll
              ref="scroll"
              @load="onLoad"
            >
              <q-list
                v-for="(day, index) in items"
                :key="index"
                class="q-my-sm"
                bordered
                separator
              >
                <RecordItem
                  :day="day"
                />
              </q-list>
              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots
                    color="primary"
                    size="40px"
                  />
                </div>
              </template>
            </q-infinite-scroll>
            <div
              v-if="showingAll"
              class="q-my-md text-center text-h6"
            >
              Altere o período atual para exibir mais registros.
            </div>
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
            @click="openModal = true"
          />
        </q-page-sticky>
      </q-page>
    </transition>
    <RecordModal :open.sync="openModal" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RecordItem from './components/RecordItem';
import RecordModal from './components/RecordModal';

export default {
  components: {
    RecordItem,
    RecordModal,
  },

  data() {
    return {
      showingAll: false,
      openModal: false,
      listIndex: 1,
    };
  },

  computed: {
    ...mapGetters('record', ['period', 'recordsByDay']),

    items() {
      return this.recordsByDay.slice(0, this.listIndex * 5);
    },
  },


  watch: {
    /**
     *  Reset the scroll behavior when the current period is updated
     */
    period() {
      this.resetScroll();
    },
  },

  methods: {
    resetScroll() {
      this.$refs.scroll.resume();
    },
    /**
     * Called by InfiniteScroll to load more data to list
     * Uses a setTimeout for better UX and when period is updated on the end of scroll
     * Update showing all status if all records are already loaded
     * @param {number} index Size of current list
     * @param {callback} done Called with boolean to load or not more data
     */
    onLoad(index, done) {
      setTimeout(() => {
        this.listIndex = index;
        const stop = this.items.length === this.recordsByDay.length;
        this.showingAll = stop;
        done(stop);
      }, 1000);
    },
  },

};
</script>

<style lang="stylus">
// #records-list
</style>
