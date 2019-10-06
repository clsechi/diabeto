<template>
  <q-btn
    flat
    round
    dense
    icon="menu"
    @click="$emit('update:open', !open)"
  />
</template>

<script>
export default {
  name: 'MenuBtn',

  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
