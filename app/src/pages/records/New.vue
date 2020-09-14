<template>
  <q-page
    id="new"
    class="q-pb-md"
  >
    <div class="row">
      <div class="col-12 q-mt-md flex justify-center">
        <RecordForm
          class="form"
          @completed="redirect"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import RecordForm from './components/RecordForm';

export default {
  name: 'New',

  components: {
    RecordForm,
  },

  methods: {
    redirect() {
      this.$router.push({ name: 'records' });
    },
  },
};
</script>

<style lang="stylus">
#new
  .form
    max-width 600px
    min-width 30vw
    @media (max-width: 600px)
      min-width 95vw
</style>
