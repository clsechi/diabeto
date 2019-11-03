import Vue from 'vue';
import VueRouter from 'vue-router';
import { Notify } from 'quasar';

import store from '../store';
import routes from './routes';

Vue.use(VueRouter);

// TODO should go back to null when user logout
let CURRENT_USER = null; 

const getRecords = async () => {
  if (!store.getters['record/records'].length) {
    await store.dispatch('record/getRecords');
  }
};

const showApp = () => {
  const app = document.getElementById('q-app');
  const splashScreen = document.getElementById('splash-screen');
  splashScreen.style.display = 'none';
  app.style.display = 'block';
};

const toLogin = records => records.some(record => record.name === 'login');

const routerValidations = async (to, from, next) => {
  try {
    if (CURRENT_USER) {
      await getRecords();
    }
  } catch (err) {
    Vue.prototype.$log.error(err);
    Notify('Something happens, try again');
  } finally {
    showApp();
  }

  if (CURRENT_USER && toLogin(to.matched)) {
    next({ name: 'app' });
  }

  if (to.matched.some(record => record.meta.auth) && !CURRENT_USER) {
    next({
      name: 'login',
      query: { redirect: to.fullPath },
    });
  }
  next();
};

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  });

  Router.beforeEach((to, from, next) => {
    Vue.prototype.$log.debug('User logged', Boolean(CURRENT_USER));
    if (!CURRENT_USER) {
      Vue.prototype.$firebase.auth().onAuthStateChanged(async (currentUser) => {
        Vue.prototype.$log.debug('authStateChanged', Boolean(currentUser));
        CURRENT_USER = currentUser;
        await routerValidations(to, from, next);
      });
    } else {
      routerValidations(to, from, next);
    }
  });

  return Router;
}
