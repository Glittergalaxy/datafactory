/* eslint-disable @typescript-eslint/no-explicit-any */
import API from '@/views/feature-management/api';
import { createVNode, defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { deepCopy } from '@/common/utils';
import { MENU_ITEM } from '@/common/constants';

import AddMenu from '../add-menu/index.vue';

export interface TreeOption {
  key: number;
  title: string;
  children?: TreeOption[];
  level?: number;
}

const dataList: TreeOption[] = [];
let firstGrandson: TreeOption;
const generateList = (data: TreeOption[]) => {
  for (let i = 0; i < data.length; i += 1) {
    const node = data[i];
    const { key, title } = node;
    dataList.push({ key, title });
    if (node.children) {
      generateList(node.children);
    }
    if (node.level === 3 && !firstGrandson) {
      firstGrandson = node;
    }
  }
};

const getParentKey = (key: number, tree: TreeOption[]): number | undefined => {
  let parentKey;
  for (let i = 0; i < tree.length; i += 1) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const mapData = (data: any) => data.map(({
  subMenu, id, menuName, level,
}: any) => ({
  children: subMenu && mapData(subMenu),
  key: id,
  title: menuName,
  scopedSlots: { title: 'title' },
  level,
}));

export default defineComponent({
  name: 'left-tree',
  components: {
    PlusOutlined,
    ExclamationCircleOutlined,
    AddMenu,
  },
  data() {
    return {
      selectedKeys: [] as number[],
      tree: [],
      expandedKeys: [] as number[],
      searchValue: '',
      autoExpandParent: true,
      currentItem: {},
      addVisible: false,
      addItem: {},
      mode: '',
      rightClickItem: {} as TreeOption,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data } = await API.getTreeData();
      this.tree = mapData(data);
      generateList(this.tree);
      // 默认选中第一个子项
      this.currentItem = firstGrandson;
      this.selectedKeys = [firstGrandson.key];
      const parents = this.getAllParents(firstGrandson.key);
      this.$emit('change-item', { ...firstGrandson, path: [firstGrandson.key, ...parents] });
      // 默认展开第一个子项
      if (parents.length) {
        this.expandedKeys = [...parents].reverse();
      }
    },
    onChange(e: any) {
      const { value } = e.target;
      const expandedKeys = dataList
        .map((item) => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.tree);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      });
    },
    onDrop() {
      // todo
    },
    getAllParents(key: number) {
      const getKeys = (sonKey: number, result: number[] = []) => {
        const parentKey: number| undefined = getParentKey(sonKey, this.tree);
        if (parentKey !== undefined) {
          result.push(parentKey);
          getKeys(parentKey, result);
        }
        return result;
      };
      return getKeys(key);
    },
    onSelect(keys: string[], target: any) {
      // todo
      const nodes = target.selectedNodes;
      const info = nodes[0].props;
      const { key, level } = info;
      this.currentItem = info;
      this.selectedKeys = [key];
      const parents = this.getAllParents(key);
      this.$emit('change-item', { key, level, path: [key, ...parents] });
    },
    onExpand(expandedKeys: any) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onAdd() {
      this.mode = 'add';
      this.addItem = deepCopy(MENU_ITEM);
      this.addVisible = true;
    },
    onRightClick(val: any) {
      this.rightClickItem = val?.node?.dataRef;
    },
    onModify() {
      const { title, level, key } = this.rightClickItem;
      const parentId = getParentKey(key, this.tree);
      this.addItem = {
        menuName: title,
        parentId,
        level,
      };
      this.mode = 'edit';
      this.addVisible = true;
    },
    onDel() {
      const { key, level } = this.rightClickItem;
      Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '确定删除该目录吗?',
        onOk: async () => {
          await API.delMenu({ id: key, level });
          this.getData();
        },
      });
    },
  },
});
