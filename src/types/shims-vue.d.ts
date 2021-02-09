declare module '*.vue' {
  import { defineComponent } from 'vue';

  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module '@ant-design-vue/pro-layout';

declare interface AxiosResult {
  code: number;
  message: string;
  result: [];
}
