<template>
  <p class="q-pa-sm">
    v{{ version }} /
    Made with ❤ by
    <a
      href="https://github.com/clsechi"
      target="_blank"
      rel="noopener noreferrer"
    >
      @clsechi
    </a>
  </p>
</template>

<script>
export default {
  data() {
    return {
      version: process.env.VERSION,
    };
  },
};
</script>
