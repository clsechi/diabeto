<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Diabeto
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
  </q-layout>
</template>

<script>

export default {
  name: 'LayoutPrivate',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
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
</style>
