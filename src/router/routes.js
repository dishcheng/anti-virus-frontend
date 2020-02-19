const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        name: 'index',
      },
      {
        path: 'order_detail',
        component: () => import('pages/OrderDetail.vue'),
        name: 'order_detail',
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminMainLayOut.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/Shop/Login.vue'),
        name: 'adminLogin',
      },
      {
        path: '',
        component: () => import('pages/Shop/Admin.vue'),
        name: 'adminIndex',
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
