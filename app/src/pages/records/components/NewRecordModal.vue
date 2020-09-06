<template>
  <q-dialog
    position="top"
    :value="open"
    @hide="close"
  >
    <div
      id="new-record-modal"
      class="row bg-white q-pa-md"
    >
      <div class="col-12 ">
        <q-btn
          class="float-right q-mr-sm q-mb-sm"
          round
          dense
          unelevated
          size="sm"
          icon="close"
          title="fechar"
          @click="close"
        />
      </div>
      <div class="col-12">
        <RecordForm
          :fixed-date="date"
          @completed="close"
        />
      </div>
    </div>
  </q-dialog>
</template>

<script>
import RecordForm from './RecordForm';

export default {
  name: 'NewRecordModal',

  components: {
    RecordForm,
  },

  props: {
    open: {
      required: true,
      type: Boolean,
    },
    date: {
      type: String,
      required: false,
      default: null,
    },
  },

  methods: {
    close() {
      this.$emit('update:open', false);
    },
  },
};
</script>

<style lang="stylus">
#new-record-modal
  max-width 600px
  min-width 30vw
  @media (max-width: 600px)
    min-width 95vw
</style>
