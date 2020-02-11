<template>
  <q-page padding>
    <div class="text-center">
      <img
        src="statics/logo.png"
        alt="logo diabeto"
      >
      <p>v{{ version }}</p>
      <!--  TODO better description -->
      <p class="text-h6">
        Diabeto é um projeto open source disponível nesse
        <a
          href="https://github.com/clsechi/diabeto"
          target="_blank"
          rel="noopener noreferrer"
        >
          link
        </a>
      </p>
      <p class="text-h6">
        Made with ❤ by
        <a
          href="https://github.com/clsechi"
          target="_blank"
          rel="noopener noreferrer"
        >
          @clsechi
        </a>
      </p>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'AboutIndex',

  data() {
    return {
      version: process.env.VERSION,
    };
  },
};
</script>

<style lang="stylus">

</style>
