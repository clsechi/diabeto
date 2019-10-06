<template>
  <q-page class="q-pb-md">
    <div class="row">
      <div class="col-12 q-mt-md flex justify-center">
        <RecordForm />
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
};
</script>
