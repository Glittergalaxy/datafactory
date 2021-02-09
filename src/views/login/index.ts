import {
  defineComponent, reactive, unref,
} from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm } from '@ant-design-vue/use';
import { modalFormLayout } from '@/common/constants/index';
import { requiredField } from '@/common/utils';
import API from '@/views/feature-management/api';

export default defineComponent({
  name: 'login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const form = reactive({
      username: '',
      password: '',
    });
    const rules = reactive({
      username: requiredField('用户名'),
      password: requiredField('密码'),
    });
    const { validate } = useForm(form, rules);

    const onSubmit = async () => {
      try {
        await validate();
        const { result } = await API.login(unref(form));
        const { username } = form;
        store.commit('update', { ...result, username });
        router.push({
          name: 'featureList',
        });
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
