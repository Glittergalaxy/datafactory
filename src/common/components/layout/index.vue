<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      :trigger="null"
      :width="200"
    >
      <div class="ant-sider-menu-logo"></div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <apartment-outlined />
          <span>数据工厂</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <a-dropdown :overlayStyle="{width: '120px'}">
          <span>
            <img class="layout-avatar" :src="require('@/assets/avatar.png')" />
            <span>{{userInfo.username}}</span>
          </span>
          <template #overlay>
            <a-menu @click="onClick">
              <a-menu-item key="1">
                <logout-outlined />退出登录
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </a-layout-header>
      <a-layout-content>
        <slot />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" src="./index.ts"></script>

<style scoped>
.ant-layout {
  min-height: 100%;
}
.ant-layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 70px 0 24px;
  background: #fff;
}
.anticon.trigger {
  font-size: 20px;
}
.ant-sider-menu-logo {
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  line-height: 64px;
  background: #001529;
}
.layout-avatar {
  width: 24px;
  height: 24px;
  display: inline-block;
  margin-right: 8px;
}
.ant-layout-content {
  margin: 24px;
}
</style>
