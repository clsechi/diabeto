<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <component
          :is="toolbarButton"
          :open.sync="leftDrawerOpen"
        />
        <q-toolbar-title>
          {{ toolbarTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <div class="row menu text-weight-medium">
        <div class="col-12">
          <img
            :src="photoURL"
            alt="avatar"
            class="avatar q-mb-md"
          >
        </div>
        <div class="col-12">
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
            <q-item-label>App</q-item-label>
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

    <!-- <q-footer class="footer q-pb-md">
      <div class="text-center text-black">
        Made with ❤
      </div>
    </q-footer> -->
  </q-layout>
</template>

<script>
import menuBtn from '../components/menuBtn';
import backBtn from '../components/backBtn';

export default {
  name: 'LayoutPrivate',
  components: {
    menuBtn,
    backBtn,
  },
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop || false,
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
