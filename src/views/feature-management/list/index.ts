/* eslint-disable import/no-extraneous-dependencies */
import {
  computed,
  createVNode, defineComponent, reactive, ref,
} from 'vue';
import { useStore } from 'vuex';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons-vue';

import useList from '@/common/hooks/useList';
import { deepCopy } from '@/common/utils';
import { TOOL_ITEM } from '@/common/constants';

import LeftTree from './components/left-tree/index.vue';
import InfoCard from './components/info-card/index.vue';
import AddInterface from './components/add-interface/index.vue';
import API from '../api';

export interface Tool {
  id: number;
  toolName: string;
  owner?: string;
  firstMenuId?: string;
  secondMenuId?: string;
  thirdMenuId?: string;
  webJson: string;
  remarks?: string;
}

export default defineComponent({
  name: 'feature-list',
  components: {
    ExclamationCircleOutlined,
    SearchOutlined,
    LeftTree,
    InfoCard,
    AddInterface,
  },
  setup() {
    const store = useStore();
    const userInfo = computed(() => store.state.userInfo);
    const form = reactive<Record<string, string | number>>({
      keywords: '',
      menuid: '',
      menulevel: '',
    });
    const {
      pager, list, onPageNumChange, onPageSizeChange,
    } = useList(
      API.getList,
      form,
    );

    const showDetail = ref(false);
    const mode = ref('add');
    const tool = ref({});
    const onAdd = () => {
      mode.value = 'add';
      showDetail.value = true;
      tool.value = deepCopy(TOOL_ITEM);
    };

    const onEdit = async (item: Tool) => {
      // const res = await API.getDetail({ id: item.id });
      // tool.value = res.result;
      mode.value = 'edit';
      showDetail.value = true;
      tool.value = deepCopy(item);
    };

    const onDel = (item: Tool) => {
      Modal.confirm({
        title: '提示',
        icon: createVNode(ExclamationCircleOutlined),
        content: '是否确认删除该接口？',
        async onOk() {
          await API.del({
            id: item.id,
          });
          onPageNumChange(1);
        },
      });
    };

    const currentPath = ref([]);
    const changeMenu = (item: any) => {
      // console.log(item);
      const { key, level, path } = item;
      currentPath.value = path;
      form.menuid = key;
      form.menulevel = level;
    };

    return {
      form,
      pager,
      list,
      onPageNumChange,
      onPageSizeChange,
      showDetail,
      mode,
      tool,
      onAdd,
      onEdit,
      onDel,
      changeMenu,
      currentPath,
      userInfo,
    };
  },
});
