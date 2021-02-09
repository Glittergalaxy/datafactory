<template>
  <div>
    <div class="f-flex">
      <a-input-search placeholder="请搜索" @change="onChange" />
      <a-button class="f-ml10" shape="circle" @click="onAdd">
        <template #icon><PlusOutlined /></template>
      </a-button>
    </div>
    <a-tree
      :selectedKeys="selectedKeys"
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="tree"
      @select="onSelect"
      @expand="onExpand"
      @rightClick="onRightClick"
    >
      <template #title="{ title }">
        <a-popover trigger="contextmenu"  placement="right">
          <template #content>
            <a class="f-mr10" @click="onDel">删除</a>
            <a @click="onModify">修改</a>
          </template>
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: red">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </a-popover>
      </template>
    </a-tree>

    <add-menu
      :item="addItem"
      :mode="mode"
      :parent="currentItem"
      v-model:modalVisible="addVisible"
      @success="getData"
    ></add-menu>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
