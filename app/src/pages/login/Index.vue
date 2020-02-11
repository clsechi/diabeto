<template lang='pug'>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="login column justify-around">
        <p class="fixed-right q-pa-sm">
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
        <div class="flex flex-center">
          <img class="logo" src="statics/logo.png" />
        </div>
        <div>
          <div class="text-subtitle1 text-center q-px-md text-bold">
            Escolha uma conta para continuar:
          </div>
          <div id="firebaseui-auth-container"></div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import * as firebaseui from 'firebaseui';

export default {
  name: 'Login',

  data() {
    return {
      version: process.env.VERSION,
    };
  },

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      const uiConfig = {
        signInFlow: 'redirect',
        signInOptions: [
          {
            provider: this.$firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          },
        ],
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        tosUrl: '',
        privacyPolicyUrl: '',
        callbacks: {
          signInSuccessWithAuthResult: () => {
            this.$router.push({ name: 'app' });
          },
          signInFailure: (err) => {
            this.$q.notify(err.message);
          },
        },
      };
      this.$authUI.start('#firebaseui-auth-container', uiConfig);
    },
  },
};
</script>

<style lang='stylus' scoped>

@import url('https://cdn.firebase.com/libs/firebaseui/3.5.2/firebaseui.css');

</style>

<style lang="stylus">
// .firebaseui-tospp-full-message
//   color white
</style>
