<template>
  <a-card>
    <a-row type="flex">
      <a-col :flex="1">
        <a-card class="f-br0">
          <left-tree @changeItem="changeMenu" />
        </a-card>
      </a-col>
      <a-col :flex="23" v-if="!showDetail">
        <a-card>
          <a-row type="flex" :gutter="[0, 20]">
            <a-col :flex="2">
              <a-button v-if="userInfo.role != 3" type="primary" class="f-fl" @click="onAdd">
                添加接口
              </a-button>
            </a-col>
            <a-col :flex="1">
              <a-input-search
                class="f-fr"
                placeholder="请搜索"
                v-model:value="form.keywords"
              />
            </a-col>
          </a-row>

          <a-row :gutter="[20, 20]" class="f-pd20">
            <a-col
              :xs="24"
              :sm="24"
              :md="24"
              :lg="24"
              :xl="12"
              :xxl="8"
              v-for="(item, index) in list"
              :key="index"
            >
              <info-card :item="item" @edit="onEdit" @del="onDel" />
            </a-col>
          </a-row>

          <div class="datafactory-list-pager">
            <a-pagination
              class="f-fr"
              show-quick-jumper
              show-size-changer
              :show-total="(total) => `总共 ${pager.total} 条数据`"
              :total="pager.total"
              @change="onPageNumChange"
              @showSizeChange="onPageSizeChange"
            />
          </div>
        </a-card>
      </a-col>

      <a-col :flex="23" v-else>
        <add-interface
          v-model:item="tool" :mode="mode"
            :currentPath="currentPath"
            @cancel="showDetail = false" />
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts" src="./index.ts"></script>
