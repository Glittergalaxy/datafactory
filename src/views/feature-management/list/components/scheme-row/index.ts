import {
  computed,
  defineComponent, PropType, unref, watch,
} from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PlusOutlined, MinusOutlined } from '@ant-design/icons-vue';

import { PARAM_ITEM, requiredList, typeList } from '@/common/constants';
import { deepCopy } from '@/common/utils';
import { Param } from '../scheme-table/index';

export default defineComponent({
  name: 'scheme-row',
  props: {
    mode: {
      type: String as PropType<string>,
      default: 'edit',
    },
    row: {
      type: Object as PropType<Param>,
      default: {
        name: '',
        type: [],
        charactor: '',
        required: [],
        value: '',
      },
    },
  },
  emits: ['add', 'del', 'update:row'],
  components: {
    PlusOutlined,
    MinusOutlined,
  },
  setup(props, { emit }) {
    const item = computed({
      get: () => props.row,
      set: (val: object) => {
        emit('update:row', val);
      },
    });

    watch(() => item.value.type, (val) => {
      if (['Object', 'Array'].includes(val)) {
        unref(item).sub = [deepCopy(PARAM_ITEM)];
      }
    }, {
      immediate: true,
    });

    const onAdd = () => {
      const temp = deepCopy(unref(item));
      temp.sub.push(deepCopy(PARAM_ITEM));
      item.value = temp;
    };

    const onDel = (index: number) => {
      const temp = deepCopy(unref(item));
      temp.sub.splice(index, 1);
      item.value = temp;
    };
    return {
      item,
      onAdd,
      onDel,
      requiredList,
      typeList,
    };
  },
});
