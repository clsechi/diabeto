<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <component
          :is="toolbarButton"
          :open.sync="leftDrawerOpen"
        />
        <q-toolbar-title>
          {{ toolbarTitle }}
        </q-toolbar-title>

        <PeriodSelector
          style="max-width: 150px"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <div class="row menu">
        <div class="col-12">
          <q-img
            :src="photoURL"
            alt="avatar"
            spinner-color="primary"
            class="avatar"
            style="height: 50px; max-width: 50px"
          >
            <template v-slot:error>
              <img
                src="statics/logo.png"
                width="50"
                style="background-color: white"
              >
              <img>
            </template>
          </q-img>
        </div>
        <div class="col-12 text-weight-medium">
          <span class="q-title capitalize block">{{ displayName }}</span>
          <small class="q-caption">{{ email }}</small>
        </div>
      </div>
      <q-list>
        <q-item
          clickable
          :to="{ name: 'app' }"
          exact
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'records' }"
          exact
        >
          <q-item-section avatar>
            <q-icon name="list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Registros</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'settings' }"
          exact
        >
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Configurações</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          :to="{ name: 'about' }"
          exact
        >
          <q-item-section avatar>
            <q-icon name="explore" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sobre</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="signOut"
        >
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import PeriodSelector from 'src/components/PeriodSelector';
import menuBtn from 'src/components/menuBtn';
import backBtn from 'src/components/backBtn';

export default {
  name: 'LayoutPrivate',
  components: {
    menuBtn,
    backBtn,
    PeriodSelector,
  },
  data() {
    return {
      leftDrawerOpen: this.$q.screen.width > 1024 || false,
    };
  },
  computed: {
    displayName() {
      return this.$firebase.auth().currentUser.displayName;
    },
    email() {
      return this.$firebase.auth().currentUser.email;
    },
    photoURL() {
      return this.$firebase.auth().currentUser.photoURL;
    },
    toolbarTitle() {
      return this.$route.meta.toolbar.title;
    },
    toolbarButton() {
      return `${this.$route.meta.toolbar.button}Btn`;
    },
  },
  methods: {
    signOut() {
      this.$firebase.auth().signOut();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style lang="stylus" scoped>
.menu
  background-image url('https://picsum.photos/300/200.webp')
  padding: 15px;
.avatar
  border-radius: 50%
  vertical-align: baseline;
.footer
  background none
</style>
