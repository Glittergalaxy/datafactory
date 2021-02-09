import { FORMAPI, JSONAPI } from '@/common/request';

export default {
  getTreeData: (data?: object) => FORMAPI('get', '/system/menu/get', data),
  getList: (data: object) => FORMAPI('get', '/system/tool/getlist', data),
  add: (data: object): any => JSONAPI('post', '/system/tool/add', data),
  getDetail: (data: object): any => FORMAPI('get', '/system/tool/getdetail', data),
  del: (data: object) => FORMAPI('get', '/system/tool/delete', data),
  addMenu: (data: object): any => JSONAPI('post', '/system/menu/add', data),
  delMenu: (data: object): any => JSONAPI('post', '/system/menu/delete', data),
  login: (data: object): any => JSONAPI('post', '/system/login', data),
};
