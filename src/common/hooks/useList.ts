import {
  reactive, Ref, ref, watchEffect,
} from 'vue';

interface Pager {
  total: number;
  pageNum: number;
  pageSize: number;
}

export default function (api: Function, params: Record<string, string | number>) {
  const pager = reactive<Pager>({
    total: 0,
    pageNum: 0,
    pageSize: 10,
  });
  const list: Ref<object[]> = ref([]);
  const getList = async () => {
    try {
      const { pageNum, pageSize } = pager;
      const searchParams = {
        pageNum,
        pageSize,
        ...params,
      };
      const { data } = await api(searchParams);
      if (data) {
        pager.total = data.total;
        list.value = data.list;
      }
    } catch (e) {
      console.error(e);
    }
  };
  const onPageSizeChange = (current: number, size: number) => {
    pager.pageSize = size;
  };
  const onPageNumChange = (num: number) => {
    pager.pageNum = num;
  };
  watchEffect(getList);
  return {
    pager,
    list,
    onPageSizeChange,
    onPageNumChange,
  };
}
