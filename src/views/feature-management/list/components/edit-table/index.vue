<template>
  <div class="scheme">
    <div class="scheme-hd">
      <div class="scheme-cell scheme-cell--short">名称</div>
      <div class="scheme-cell">请求路径</div>
      <div class="scheme-cell scheme-cell--short">请求方式</div>
      <div class="scheme-cell">参数类型</div>
      <div class="scheme-cell scheme-cell--short">操作</div>
    </div>
    <div v-if="list.length" class="scheme-bd">
      <div v-for="(item, index) in list" :key="index">
        <div class="scheme-row">
          <div class="scheme-cell scheme-cell--short">
            <a-input v-model:value="item.name" />
          </div>
          <div class="scheme-cell">
            <a-input v-model:value="item.url" placeholder="如/getlist" />
          </div>
          <div class="scheme-cell scheme-cell--short">
            <a-select v-model:value="item.method">
              <a-select-option v-for="method in methodList" :key="method">{{
                method
              }}</a-select-option>
            </a-select>
          </div>
          <div class="scheme-cell">
            <a-select v-model:value="item.contentType">
              <a-select-option
                v-for="contentType in contentTypeList"
                :key="contentType"
                >{{ contentType }}</a-select-option
              >
            </a-select>
          </div>
          <div class="scheme-cell scheme-cell--short">
            <span class="scheme-font" @click="onAdd"><PlusOutlined /></span>
            <span v-if="index !== 0" class="scheme-font" @click="onDel(index)"
              ><MinusOutlined
            /></span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="scheme-bd">
      <div class="scheme-row">
        <span>无按钮信息，请<a @click="onAdd">添加按钮</a></span>
      </div>
    </div>
  </div>
</template>

<script lang="typescript" src="./index.ts"></script>
