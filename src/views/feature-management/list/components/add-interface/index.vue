<template>
  <a-card>
    <a-form
      :model="form"
      :rules="rules"
      v-bind="formLayout"
      @finish="onSubmit"
    >
      <a-form-item label="功能名称" name="toolName">
        <a-input v-model:value="form.toolName" placeholder="请输入" style="width:200px" />
      </a-form-item>
      <a-form-item label="备注说明">
        <a-textarea
          v-model:value="form.remarks"
          placeholder="请输入描述，不超过300字"
          :minRows="4"
          showCount
          :maxlength="300"
          style="width:200px"
        />
      </a-form-item>
      <a-form-item label="传参" name="params">
        <scheme-table :info="form.params" />
      </a-form-item>
      <a-form-item label="按钮" name="headers">
        <edit-table :info="form.headers" />
      </a-form-item>
      <div align="center">
        <a-button html-type="submit" type="primary">
          保存
        </a-button>
        <a-button @click="$emit('cancel')">
          返回
        </a-button>
      </div>
    </a-form>
  </a-card>
</template>

<script lang="ts" src="./index.ts"></script>
