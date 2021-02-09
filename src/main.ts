import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './registerServiceWorker';
import 'ant-design-vue/dist/antd.css';
import '@/common/styles/index.scss';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
createApp(App).use(Antd).use(store).use(router)
  .mount('#app');

// if (module.hot) {
//   // 使 action 和 mutation 成为可热重载模块
//   module.hot.accept(['./mutations', './modules/a'], () => {
//     // 获取更新后的模块
//     // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
//     const newMutations = require('./mutations').default;
//     // 加载新模块
//     store.hotUpdate({
//       mutations: newMutations,
//     });
//   });
// };
