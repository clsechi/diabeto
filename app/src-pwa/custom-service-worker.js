/* global workbox */
/* eslint-env serviceworker */
/* eslint-disable no-underscore-dangle, no-restricted-globals */

workbox.core.setCacheNameDetails({ prefix: 'diabeto' });

workbox.googleAnalytics.initialize();

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

addEventListener('message', (messageEvent) => {
  if (messageEvent.data === 'skipWaiting') return skipWaiting();
  return null;
});
