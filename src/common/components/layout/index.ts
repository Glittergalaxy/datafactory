import {
  computed, ComputedRef, defineComponent, reactive, ref,
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import {
  ApartmentOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
// eslint-disable-next-line import/no-extraneous-dependencies
} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'layout',
  components: {
    ApartmentOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    LogoutOutlined,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const userInfo: ComputedRef<Record<string, string>> = computed(() => {
      const temp = store.state.userInfo;
      if (temp.role) {
        return store.state.userInfo;
      }
      if (route?.fullPath !== '/' && route.fullPath !== '/login') {
        message.error('您尚未登录，请先登录!');
        router.push({
          name: 'login',
        });
      }
      return store.state.userInfo;
    });

    const selectedKeys = reactive<string[]>(['1']);
    const collapsed = ref<boolean>(true);
    const onClick = () => {
      // todo
      store.commit('update', {});
    };
    return {
      collapsed,
      selectedKeys,
      onClick,
      userInfo,
    };
  },
});
