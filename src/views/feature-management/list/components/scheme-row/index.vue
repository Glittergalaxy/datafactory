<template>
  <div>
    <div class="scheme-row">
      <div class="scheme-cell">
        <a-input
          :disabled="mode !== 'edit'"
          v-model:value="item.name"
          placeholder="如纳税人"
        />
      </div>
      <div class="scheme-cell" v-if="mode === 'edit'">
        <a-input v-model:value="item.charactor" placeholder="如taxer" />
      </div>
      <div class="scheme-cell" v-if="mode === 'edit'">
        <a-select v-model:value="item.type">
          <a-select-option v-for="type in typeList" :key="type">{{
            type
          }}</a-select-option>
        </a-select>
      </div>
      <div class="scheme-cell scheme-cell--short">
        <a-select v-model:value="item.required" :disabled="mode !== 'edit'">
          <a-select-option
            v-for="required in requiredList"
            :key="required.id"
            >{{ required.name }}</a-select-option
          >
        </a-select>
      </div>
      <div class="scheme-cell">
        <a-input
          v-if="item.type === 'String'"
          v-model:value="item.value"
          placeholder="请输入"
        />
        <a-input-number
          v-else-if="item.type === 'Number'"
          v-model:value="item.value"
          placeholder="请输入"
        />
        <a-select
          v-else-if="item.type === 'Boolean'"
          v-model:value="item.value"
          placeholder="请选择"
        >
          <a-select-option v-for="bool in boolList" :key="bool">{{
            bool
          }}</a-select-option>
        </a-select>
      </div>
      <div class="scheme-cell scheme-cell--short" v-if="mode === 'edit'">
        <span class="scheme-font" @click="$emit('add')"><PlusOutlined /></span>
        <span class="scheme-font" @click="$emit('del')"><MinusOutlined /></span>
      </div>
    </div>
  </div>
  <template v-if="['Object', 'Array'].includes(item.type)">
    <div
      v-for="(record, recordIndex) in item.sub"
      :key="recordIndex"
      class="f-pl20"
    >
      <scheme-row
        v-model:row="item.sub[recordIndex]"
        @add="onAdd"
        @del="onDel(recordIndex)"
        :mode="mode"
      />
    </div>
  </template>
</template>

<script lang="ts" src="./index.ts"></script>
