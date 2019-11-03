
const routes = [
  {
    path: '/login',
    component: () => import('pages/login/Index.vue'),
    name: 'login',
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
