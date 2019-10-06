<template>
  <q-btn
    icon="arrow_back"
    text-color="white"
    size="15px"
    round
    dense
    flat
    no-ripple
    @click="$router.go(-1)"
  />
</template>

<script>
export default {
  name: 'BackBtn',
};
</script>
