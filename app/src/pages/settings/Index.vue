<template>
  <q-page padding>
    <div
      id="settings"
      class="row"
    >
      <div class="col-12 flex justify-center">
        <q-list
          class="list"
          bordered
          padding
        >
          <q-item-label
            header
          >
            Geral
          </q-item-label>
          <q-item
            v-ripple
            tag="label"
          >
            <q-item-section>
              <q-item-label>Dark Mode</q-item-label>
            </q-item-section>
            <q-item-section
              side
              top
            >
              <q-toggle
                :value="darkModeActive"
                @input="changeDarkMode"
              />
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item-label
            header
            class="q-mt-sm"
          >
            Notificações
          </q-item-label>
          <q-item
            v-ripple
            tag="label"
          >
            <q-item-section>
              <q-item-label>Lembretes</q-item-label>
              <q-item-label caption>
                Permitir notificações
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                v-model="notif1"
                color="blue"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { setActiveStatus } from 'src/helpers/darkMode';

export default {
  name: 'SettingsIndex',

  data() {
    return {
      notif1: false,
    };
  },

  computed: {
    darkModeActive() {
      return this.$q.dark.isActive;
    },
  },

  methods: {
    changeDarkMode(val) {
      setActiveStatus(val);
    },
  },
};
</script>

<style lang="stylus">
#settings
  .list
    width 90vw
    max-width 500px
</style>
