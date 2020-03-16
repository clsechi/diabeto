<template>
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
          @click="$router.push({ name: 'new' })"
        />
      </q-page-sticky>
    </q-page>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import RecordItem from './components/RecordItem';

export default {
  components: {
    RecordItem,
  },

  data() {
    return {
      items: [],
      showingAll: false,
    };
  },

  computed: {
    ...mapGetters('record', ['period', 'recordsByDay']),
  },


  watch: {
    /**
     *  Reset the scroll behavior when the current period is updated
     */
    period() {
      this.resetScroll();
    },
  },

  mounted() {
    this.upgradeList(1);
  },

  methods: {
    /**
     * Define the records on current list
     * @param {number} index Size of the current list
     */
    upgradeList(index) {
      this.items = this.recordsByDay.slice(0, index * 5);
    },

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
        this.upgradeList(index);
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
