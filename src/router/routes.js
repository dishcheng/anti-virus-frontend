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
      },
      {
        path: 'shopJoinIn',
        component: () => import('pages/ShopJoinIn.vue'),
        name: 'shopJoinIn',
      },
      {
        path: 'showAdminPageIntroduce',
        component: () => import('pages/showAdminPageIntroduce.vue'),
        name: 'showAdminPageIntroduce',
      },
    ]
  },
  {
    path: '/admin/login',
    component: () => import('pages/Shop/Login.vue'),
    name: 'adminLogin',
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminMainLayOut.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Shop/Admin.vue'),
        name: 'adminIndex',
      },
      {
        path: 'product',
        component: () => import('pages/Shop/Product.vue'),
        name: 'adminProduct',
      },
      {
        path: 'address',
        component: () => import('pages/Shop/Address.vue'),
        name: 'adminAddress',
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
