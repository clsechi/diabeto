<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="column">
        <div class="flex justify-end">
          <AppVersion />
        </div>
        <div class="flex justify-center">
          <img
            class="logo"
            title="Diabeto logo"
            src="logo.png"
          >
        </div>
        <div class="flex justify-center q-mt-md">
          <div
            class="full-width column"
            style="max-width: 300px"
          >
            <div class="text-center">
              <p class="text-h6">
                Faça login para continuar
              </p>
            </div>
            <div class="q-my-sm">
              <q-input
                v-model="form.email"
                tabindex="1"
                filled
                autofocus
                clearable
                lazy-rules
                type="text"
                title="Email"
                label="Email"
                error-message="Campo obrigatório"
                autocomplete="email"
                :error="$v.form.email.$error"
                @keyup.enter="signIn"
                @blur="$v.form.email.$touch"
              />
            </div>
            <div class="q-my-sm">
              <q-input
                v-model="form.password"
                tabindex="2"
                filled
                clearable
                lazy-rules
                title="Senha"
                label="Senha"
                error-message="Campo obrigatório"
                :error="$v.form.password.$error"
                :type="isPwd ? 'password' : 'text'"
                @keyup.enter="signIn"
                @blur="$v.form.password.$touch"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
            <div class="flex justify-end q-mb-lg">
              <q-btn
                class="full-width"
                label="Login"
                title="Login"
                tabindex="3"
                color="primary"
                size="md"
                :loading="loading"
                @click="signIn"
              />
            </div>
            <div class="text-center">
              <p class="text-weight-thin">
                Novas contas estão desativadas no momento, por favor entre em
                contato caso deseje utilizar a aplicação.
              </p>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email as validEmail } from 'vuelidate/lib/validators';
import AppVersion from './components/AppVersion';

export default {
  name: 'Login',

  components: {
    AppVersion,
  },

  mixins: [
    validationMixin,
  ],

  data() {
    return {
      isPwd: true,
      loading: false,
      form: {
        email: null,
        password: null,
      },
    };
  },

  validations: {
    form: {
      email: {
        required,
        validEmail,
      },
      password: {
        required,
      },
    },
  },

  methods: {
    async signIn() {
      this.$v.$touch();

      if (this.$v.$invalid) return this.$q.notify('Por favor, reveja os campos');

      try {
        this.loading = true;
        const { email, password } = this.form;
        await this.$firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (err) {
        this.$log.error(err);
        this.handleErrors(err);
      } finally {
        this.loading = false;
      }
    },

    handleErrors(err) {
      const options = {
        'auth/invalid-email': 'Email inválido',
        'auth/user-disabled': 'Usuário desabilitado',
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/wrong-password': 'Senha inválida',
        generic: 'Ocorreu um erro',
      };

      const message = options[err.code] || options.generic;

      this.$q.notify(message);
    },
  },
};
</script>

<style lang="stylus">
</style>
