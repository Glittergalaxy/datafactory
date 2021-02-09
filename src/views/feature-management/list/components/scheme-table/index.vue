<template>
  <div class="scheme">
    <div class="scheme-hd">
      <div class="scheme-cell">字段描述</div>
      <div class="scheme-cell" v-if="mode === 'edit'">字段名</div>
      <div class="scheme-cell" v-if="mode === 'edit'">类型</div>
      <div class="scheme-cell scheme-cell--short">必需</div>
      <div class="scheme-cell">默认值</div>
      <div class="scheme-cell scheme-cell--short" v-if="mode === 'edit'">操作</div>
    </div>
    <div v-if="list.length" class="scheme-bd">
      <div v-for="(item, index) in list" :key="index">
        <scheme-row v-model:row="list[index]" @add="onAdd" @del="onDel(index)" :mode="mode" />
      </div>
    </div>
    <div v-else class="scheme-bd">
      <div class="scheme-row">
        <span>无参数信息，请<a @click="onAdd">添加参数</a></span>
      </div>
    </div>
  </div>
</template>

<script lang="typescript" src="./index.ts"></script>
