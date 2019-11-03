<template>
  <div class="row flex justify-around">
    <div
      v-for="value in values"
      :key="value"
    >
      <q-btn
        color="orange-8"
        round
        size="12px"
        :label="value"
        @click="chooseValue(value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ButtonsRow',

  props: {
    values: {
      required: true,
      type: Array,
    },
  },

  methods: {
    chooseValue(value) {
      this.$emit('chooseValue', value);
    },
  },
};
</script>
