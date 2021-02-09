<template>
  <a-config-provider :locale="locale">
    <template v-if="currentRoute.name">
      <router-view v-if="['login', 'home'].includes(currentRoute.name)" />
      <layout v-else>
        <a-breadcrumb>
          <a-breadcrumb-item href="">
            <home-outlined />
            <span>首页</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item href="">
            <span>{{ currentRoute.meta.title }}</span>
          </a-breadcrumb-item>
        </a-breadcrumb>
        <router-view />
      </layout>
    </template>
  </a-config-provider>
</template>

<script>
/* eslint-disable*/
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { HomeOutlined } from '@ant-design/icons-vue';
import Layout from '@/common/components/layout/index.vue';
export default {
  components: {
    Layout,
    HomeOutlined,
  },
  data() {
    return {
      locale: zhCN,
      currentRoute: this.$router.currentRoute,
    };
  },
};
</script>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #ecf1f5;
}
</style>
