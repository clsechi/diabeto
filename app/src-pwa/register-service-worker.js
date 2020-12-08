/*
 * This file is picked up by the build system only
 * when building for PRODUCTION
 */

/* eslint-disable */

import { register } from 'register-service-worker';
import { Notify } from 'quasar';

register(process.env.SERVICE_WORKER_FILE, {
  ready() {
    console.log('App is being served from cache by a service worker.');
  },
  registered(registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('Service worker has been registered.');
  },
  cached(registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('Content has been cached for offline use.');
  },
  updatefound(registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('New content is downloading.');
  },
  updated(registration) { // registration -> a ServiceWorkerRegistration instance
    console.log('New content is available; please refresh.');

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
          handler: () => registration.waiting.postMessage('skipWaiting'),
        },
        {
          label: 'Mais tarde',
          color: 'yellow',
          handler: () => console.log('Update dismissed'),
        },
      ],
    });
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.');
  },
  error(err) {
    console.error('Error during service worker registration:', err);
  },
});

// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
