/**
 * Follows default Vue Router route object
 *
 * @property {object} meta Define the meta data of a specific routes and children
 *
 * @property {booelan} auth  define if routes need a logged user
 *
 * @property {object} toolbar define the toolbar behavior on the current route
 * @property {title} title Define the title displayed on toolbar
 * @property {title} button Define if the button represents a menu or
 * back button, each one have a specfic action
 */
const routes = [
  {
    path: '/login',
    component: () => import('pages/login/Index.vue'),
    name: 'login',
  },
  {
    path: '/doctor',
    component: () => import('pages/layouts/Doctor.vue'),
    mets: {
      token: true,
    },
    children: [
      {
        path: '',
        component: () => import('pages/doctor/Index.vue'),
        name: 'doctor',
      }
    ],
  },
  {
    path: '/',
    component: () => import('layouts/Private.vue'),
    meta: {
      auth: true,
    },
    children: [
      {
        path: '',
        component: () => import('pages/dashboard/Index.vue'),
        name: 'app',
        meta: {
          toolbar: {
            title: 'Diabeto',
            button: 'menu',
          },
        },
      },
      {
        path: 'records',
        component: () => import('pages/records/Index.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/records/List.vue'),
            name: 'records',
            meta: {
              toolbar: {
                title: 'Registros',
                button: 'menu',
              },
            },
          },
          {
            path: 'new',
            component: () => import('pages/records/New.vue'),
            name: 'new',
            meta: {
              toolbar: {
                title: 'Novo registro',
                button: 'back',
              },
            },
          },
          {
            path: 'edit/:id',
            component: () => import('pages/records/Edit.vue'),
            name: 'edit',
            meta: {
              toolbar: {
                title: 'Editar registro',
                button: 'back',
              },
            },
          },
          {
            path: ':id',
            component: () => import('pages/records/Show.vue'),
            name: 'show',
            meta: {
              toolbar: {
                title: 'Registro',
                button: 'back',
              },
            },
          },
        ],
      },
      {
        path: 'settings',
        component: () => import('pages/settings/Index.vue'),
        name: 'settings',
        meta: {
          toolbar: {
            title: 'Configurações',
            button: 'menu',
          },
        },
      },
      {
        path: 'about',
        component: () => import('pages/about/Index.vue'),
        name: 'about',
        meta: {
          toolbar: {
            title: 'Sobre',
            button: 'menu',
          },
        },
      },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
