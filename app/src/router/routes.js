
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
      },
      {
        path: 'records',
        component: () => import('pages/records/Index.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/records/List.vue'),
            name: 'records',
          },
          {
            path: 'new',
            component: () => import('pages/records/New.vue'),
            name: 'new',
          },
          {
            path: 'edit/:id',
            component: () => import('pages/records/Edit.vue'),
            name: 'edit',
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
