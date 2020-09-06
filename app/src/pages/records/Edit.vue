<template>
  <q-page
    id="edit"
    class="q-pb-md"
  >
    <div class="row">
      <div class="col-12 q-mt-md flex justify-center">
        <RecordForm
          @completed="redirect"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import RecordForm from './components/RecordForm';

export default {
  name: 'Edit',

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
#edit
  max-width 600px
  min-width 30vw
  @media (max-width: 600px)
    min-width 95vw
</style>
