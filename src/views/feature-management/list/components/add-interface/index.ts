import {
  defineComponent, PropType, reactive, ref, unref, watch,
} from 'vue';
import { message } from 'ant-design-vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from '@ant-design-vue/use';
import { formLayout } from '@/common/constants/index';
import API from '@/views/feature-management/api';
import { deepCopy, requiredField } from '@/common/utils/index';

import SchemeTable from '../scheme-table/index.vue';
import EditTable from '../edit-table/index.vue';

import { Tool } from '../../index';

export default defineComponent({
  name: 'add-interface',
  props: {
    mode: {
      type: String as PropType<string>,
      default: 'add',
    },
    item: {
      type: Object as PropType<Tool>,
      default: {},
    },
    currentPath: {
      type: Array as PropType<number[]>,
      default: [],
    },
  },
  components: {
    SchemeTable,
    EditTable,
  },
  setup(props, context) {
    const form = ref<any>({
      toolName: '',
      params: [],
      headers: [],
      remarks: '',
    });
    watch(() => props.item, (val) => {
      if (val) {
        const { webJson, ...others } = deepCopy(val);
        if (webJson !== undefined) {
          // 添加状态
          const { params = [], headers = [] } = (webJson && JSON.parse(webJson)) || {};
          form.value = {
            ...others,
            params,
            headers,
          };
        } else {
          // 编辑状态
          form.value = deepCopy(val);
        }
      }
    }, { immediate: true });

    const rules = reactive({
      toolName: requiredField('功能名称'),
    });
    const { validate } = useForm(form, rules);
    const onSubmit = async () => {
      try {
        await validate();
        const data = deepCopy(unref(form));
        if (!data.headers.length) {
          message.error('请至少添加一条按钮信息');
          return false;
        }
        const [thirdMenuId, secondMenuId, firstMenuId] = props.currentPath;
        const { headers, params, ...others } = data;
        const sendData = {
          ...others,
          firstMenuId,
          secondMenuId,
          thirdMenuId,
          webJson: JSON.stringify({
            headers,
            params,
          }),
        };
        const res = await API.add(sendData);
        if (res.errorNo === 0) {
          context.emit('cancel');
          message.success('success');
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    };
    return {
      formLayout,
      form,
      rules,
      onSubmit,
    };
  },
});
