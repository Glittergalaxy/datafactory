<template>
  <a-card size="small" :title="form.toolName">
    <template #extra>
      <span v-if="userInfo.role == 3">@{{form.owner}}</span>
      <div v-else>
      <a @click="$emit('edit', form)" href="javascript:;" class="f-mr10"
        ><EditOutlined />&nbsp;编辑</a
      >
      <a @click="$emit('del', form)" href="javascript:;"
        ><DeleteOutlined />&nbsp;删除</a
      >
      </div>
    </template>
    <a-form :model="form" :rules="rules" @finish="onSubmit">
      <a-form-item v-if="form.params.length" name="tool">
        <scheme-table :info="form.params" mode="input" />
      </a-form-item>
      <a-row type="flex" justify="center">
        <a-button
          type="primary"
          v-for="item in form.headers"
          :key="item.url"
          @click="sendRequest(item)"
        >
          {{ item.name }}
        </a-button>
      </a-row>
    </a-form>
  </a-card>
</template>

<script lang="ts" src="./index.ts"></script>
