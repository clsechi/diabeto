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
          <q-separator />
          <q-item-label
            header
          >
            Objetivos
          </q-item-label>
          <q-item
            tag="label"
          >
            <q-item-section avatar>
              <q-icon name="keyboard_arrow_down" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Glicemia Máxima</q-item-label>
            </q-item-section>
            <q-item-section
              side
            >
              {{ maxTarget }}
            </q-item-section>
          </q-item>
          <q-item
            tag="label"
          >
            <q-item-section avatar>
              <q-icon name="keyboard_arrow_up" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Glicemia Mínima</q-item-label>
            </q-item-section>
            <q-item-section
              side
            >
              {{ minTarget }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SettingsIndex',

  data() {
    return {
      notif1: false,
    };
  },

  computed: {
    ...mapGetters('user', [
      'maxTarget',
      'minTarget',
    ]),
  },
};
</script>

<style lang="stylus">
#settings
  .list
    width 90vw
    max-width 500px
</style>
