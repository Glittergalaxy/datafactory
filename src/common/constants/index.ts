export const modalFormLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export const formLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

export const typeList = [
  'String',
  'Number',
  'Boolean',
  'Object',
  'Array',
];

export const requiredList = [
  {
    name: '是',
    id: 1,
  },
  {
    name: '否',
    id: 0,
  },
];

export const boolList = [true, false];

export const methodList = ['GET', 'POST'];

export const contentTypeList = ['application/json', 'application/x-www-form-urlencoded ', 'multipart/form-data'];

export const TOOL_ITEM = {
  toolName: '',
  owner: '',
  firstMenuId: '',
  secondMenuId: '',
  thirdMenuId: '',
  webJson: '',
  remarks: '',
};

export const PARAM_ITEM = {
  name: '',
  charactor: '',
  type: 'String',
  required: 1,
  value: '',
  sub: [],
};

export const HEADER_ITEM = {
  name: '',
  url: '',
  method: '',
  contentType: '',
};

export const MENU_ITEM = {
  menuName: '',
};
