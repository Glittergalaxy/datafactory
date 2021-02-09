import { computed, defineComponent, PropType } from 'vue';

import { typeList, requiredList, PARAM_ITEM } from '@/common/constants/index';

import { deepCopy } from '@/common/utils';
import SchemeRow from '../scheme-row/index.vue';

export interface Param {
  name: string;
  charactor: string;
  type: string;
  subtype?: string;
  sub?: Param[];
  required: number;
  value: string;
}

export default defineComponent({
  name: 'scheme-table',
  props: {
    mode: {
      type: String as PropType<string>,
      default: 'edit',
    },
    info: {
      type: Array as PropType<Param[]>,
      default: [
        {
          name: '',
          type: 'String',
          charactor: '',
          required: 0,
          value: '',
          sub: [],
        },
      ],
    },
  },
  components: {
    SchemeRow,
  },
  setup(props, context) {
    const list = computed({
      get: () => props.info,
      set: (val: Param[]) => context.emit('update:info', val),
    });

    const onAdd = () => {
      list.value.push(deepCopy(PARAM_ITEM));
    };

    const onDel = (index: number) => {
      list.value.splice(index, 1);
    };

    return {
      list,
      typeList,
      requiredList,
      onAdd,
      onDel,
    };
  },
});
