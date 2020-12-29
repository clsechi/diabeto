/* eslint-disable no-unused-vars, no-console */

/*
 * This file is picked up by the build system only
 * when building for PRODUCTION
 */

import { register } from 'register-service-worker';
import { Notify } from 'quasar';

/**
 * Show a notification to let the user choose about the new app version
 *
 * {@link https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users}
 *
 * @param {object} registration A ServiceWorkerRegistration instance
 */
const handleUpdate = (registration) => {
  let refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  });

  Notify.create({
    message: 'Nova atualização disponível',
    timeout: 30000,
    color: 'primary',
    actions: [
      {
        label: 'Atualizar',
        color: 'white',
        handler: () => registration.waiting.postMessage('SKIP_WAITING'),
      },
      {
        label: 'Mais tarde',
        color: 'yellow',
        handler: () => console.log('Update dismissed'),
      },
    ],
  });
};

register(process.env.SERVICE_WORKER_FILE, {
  ready() {
    console.log('App is being served from cache by a service worker.');
  },
  registered(registration) {
    console.log('Service worker has been registered.');
  },
  cached(registration) {
    console.log('Content has been cached for offline use.');
  },
  updatefound(registration) {
    console.log('New content is downloading.');
  },
  updated(registration) {
    console.log('New content is available; please refresh.');

    handleUpdate(registration);
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.');
  },
  error(err) {
    console.error('Error during service worker registration:', err);
  },
});

// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
