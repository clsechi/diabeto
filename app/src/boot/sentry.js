import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

export default ({ Vue }) => {
  if (!process.env.DEV) {
    Sentry.init({
      dsn: 'https://321fee0ea8b04c2dba6314c91629d714@sentry.io/2401383',
      integrations: [new Integrations.Vue({
        Vue,
        debug: true,
        attachProps: true,
        logErrors: true,
      })],
    });
  }
};
