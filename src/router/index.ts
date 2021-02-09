import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/login',
  },
  {
    path: '/featureManage/list',
    name: 'featureList',
    meta: {
      title: '数据工厂',
    },
    component: () => import(/* webpackChunkName: "featureList" */ '@/views/feature-management/list/index.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = '数据工厂';
  }
  return true;
});

export default { ...router };
