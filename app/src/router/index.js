import Vue from 'vue';
import VueRouter from 'vue-router';
import { Notify } from 'quasar';

import store from '../store';
import routes from './routes';

Vue.use(VueRouter);

const getRecords = async () => {
  if (!store.getters['record/records'].length) {
    // showLoading();
    await store.dispatch('record/getRecords');
  }
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
    Vue.prototype.$firebase.auth().onAuthStateChanged(async (currentUser) => {
      try {
        if (currentUser) {
          await getRecords();
        }
      } catch (err) {
        Vue.prototype.$log.error(err);
        Notify('Something happens, try again');
      }

      // if (currentUser && toHome(to.matched)) {
      //   next({ name: 'app' });
      // }

      if (to.matched.some(record => record.meta.auth)) {
        if (!currentUser) {
          next({
            name: 'login',
            query: { redirect: to.fullPath },
          });
        }
      }
      next(); // make sure to always call next()!
    });
  });

  return Router;
}
