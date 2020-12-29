/* eslint-env serviceworker */
/* eslint-disable no-underscore-dangle, no-restricted-globals */

import { setCacheNameDetails } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

/**
 * Add listener to handle user manual SW update choice
 */
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') return self.skipWaiting();
  return null;
});

setCacheNameDetails({ prefix: 'diabeto' });

precacheAndRoute(self.__WB_MANIFEST);
