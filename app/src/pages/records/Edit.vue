<template>
  <q-page>
    <div class="row">
      <div class="col-12">
        <div class="text-h6 text-center">
          Editar registro
        </div>
      </div>
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
