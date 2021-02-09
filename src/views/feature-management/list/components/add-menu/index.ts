import {
  defineComponent, PropType, reactive, ref, unref, watch,
} from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from '@ant-design-vue/use';
import { modalFormLayout } from '@/common/constants/index';
import { requiredField } from '@/common/utils';
import API from '@/views/feature-management/api';
import { message } from 'ant-design-vue';

import { TreeOption } from '../left-tree/index';

interface Tree {
  menuName: string;
}

export default defineComponent({
  name: 'add-menu',
  props: {
    item: {
      type: Object as PropType<Tree>,
      default: {},
    },
    mode: {
      type: String as PropType<string>,
      default: false,
    },
    parent: {
      type: Object as PropType<TreeOption>,
      default: {},
    },
    modalVisible: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, context) {
    const form = ref({
      menuName: '',
    });
    watch(() => props.item, (val) => {
      if (val) {
        form.value = val;
      }
    }, { immediate: true });
    const rules = reactive({
      menuName: requiredField('目录名'),
    });
    const { validate } = useForm(form, rules);

    const onSubmit = async () => {
      try {
        await validate();
        const { level, key } = props.parent;
        const data = {
          parentId: key,
          level: level ? level + 1 : 1,
          ...unref(form),
        };
        const res = await API.addMenu(data);
        if (res.errorNo === 0) {
          message.success(`${props.mode === 'edit' ? '修改' : '添加'}成功`);
          context.emit('success');
          context.emit('update:modalVisible', false);
        }
      } catch (e) {
        console.error(e);
      }
    };
    return {
      modalFormLayout,
      form,
      rules,
      onSubmit,
    };
  },
});
