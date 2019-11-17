<template>
  <q-card
    class="q-ma-xs"
  >
    <q-card-section>
      <div class="text-grey-7">
        {{ title }}
      </div>
      <div class="text-h4 q-pt-xs">
        {{ value || '--' }}
      </div>
      <div
        v-if="message"
        class="text-grey-7"
      >
        {{ message }}
      </div>
      <slot />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'StatsCard',

  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      required: true,
    },
    message: {
      type: String,
      default: null,
    },
  },
};
</script>
