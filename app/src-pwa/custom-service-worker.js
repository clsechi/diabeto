/* global workbox */
/* eslint-env serviceworker */
/* eslint-disable no-underscore-dangle, no-restricted-globals */

workbox.core.setCacheNameDetails({ prefix: 'diabeto' });

workbox.googleAnalytics.initialize();

self.__precacheManifest = [].concat(self.__precacheManifest || []);

workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

addEventListener('message', (messageEvent) => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
  return null;
});
