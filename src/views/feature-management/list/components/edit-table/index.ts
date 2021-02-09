import {
  computed,
  defineComponent, PropType,
} from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';

import { methodList, contentTypeList, HEADER_ITEM } from '@/common/constants/index';
import { deepCopy } from '@/common/utils';

export interface Header {
  name: string;
  url: string;
  method: 'GET' | 'POST';
  contentType?: string;
}

export default defineComponent({
  name: 'scheme-table',
  props: {
    info: {
      type: Array as PropType<Header[]>,
      default: [],
    },
  },
  components: {
    PlusOutlined,
    MinusOutlined,
  },
  setup(props, context) {
    const list = computed({
      get: () => props.info,
      set: (val: Header[]) => context.emit('update:info', val),
    });
    // const list = ref([deepCopy(HEADER_ITEM)]);

    const onAdd = () => {
      list.value.push(deepCopy(HEADER_ITEM));
    };

    const onDel = (index: number) => {
      list.value.splice(index, 1);
    };

    return {
      list,
      methodList,
      contentTypeList,
      onAdd,
      onDel,
    };
  },
});
