/* eslint-disable import/no-extraneous-dependencies */
import {
  computed,
  defineComponent, PropType, reactive, ref, watch,
} from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { useForm } from '@ant-design-vue/use';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { modalFormLayout, contentTypeList } from '@/common/constants/index';
import { deepCopy, requiredField } from '@/common/utils/index';
import { FORMAPI, JSONAPI, FORMDATAAPI } from '@/common/request';

import SchemeTable from '../scheme-table/index.vue';
import { Tool } from '../../index';
import { Header } from '../edit-table';

export default defineComponent({
  name: 'info-card',
  props: {
    item: {
      type: Object as PropType<Tool>,
      default: {},
    },
  },
  components: {
    DeleteOutlined,
    EditOutlined,
    SchemeTable,
  },
  setup(props) {
    const store = useStore();
    const userInfo = computed(() => store.state.userInfo);
    const form = ref<any>({
      toolName: '',
      params: [],
      headers: [],
    });
    watch(() => props.item, (val) => {
      if (val) {
        const temp = deepCopy(val);
        const { webJson, ...others } = temp;
        const { params = [], headers = [] } = (webJson && JSON.parse(webJson)) || {};
        form.value = {
          ...others,
          params,
          headers,
        };
      }
    }, { immediate: true });
    const rules = reactive({
      name: [
        ...requiredField('名称'),
      ],
    });
    const { validate } = useForm(form, rules);
    const onSubmit = async () => {
      try {
        await validate();
      } catch (e) {
        console.error(e);
      }
    };

    const sendRequest = async (request: Header) => {
      let api;
      switch (request.contentType) {
        case contentTypeList[0]:
          api = JSONAPI;
          break;
        case contentTypeList[1]:
          api = FORMAPI;
          break;
        case contentTypeList[2]:
          api = FORMDATAAPI;
          break;
        default:
          api = JSONAPI;
      }
      const { method, url } = request;
      const res: any = await api(method, url, {});
      if (res.errorNo === 0) {
        message.success('请求成功');
      }
    };
    return {
      modalFormLayout,
      form,
      rules,
      onSubmit,
      sendRequest,
      userInfo,
    };
  },
});
