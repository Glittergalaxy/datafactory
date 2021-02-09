<template>
  <a-modal
    :footer="null"
    destroyOnClose
    :visible="modalVisible"
    @cancel="$emit('update:modalVisible', false)"
  >
    <template #title>
      {{mode === 'edit'? '修改': '添加'}}子目录
    </template>
    <a-form
      :model="form"
      :rules="rules"
      v-bind="modalFormLayout"
      @finish="onSubmit"
    >
      <a-form-item label="目录名" name="menuName">
        <a-input v-model:value="form.menuName" placeholder="请输入" />
      </a-form-item>
      <a-form-item :wrapperCol="{span: 24}" class="f-mb0">
        <a-button class="f-fr" html-type="submit" type="primary">
          确定
        </a-button>
        <a-button class="f-fr" @click="$emit('update:modalVisible', false)">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" src="./index.ts"></script>
