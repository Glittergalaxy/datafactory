export const requiredField = (field: string) => [
  {
    required: true,
    message: `${field}不得为空`,
  },
];

export const filterEmpty = (obj: any) => {
  const temp: any = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== '') {
      if (typeof obj[key] === 'string') {
        temp[key] = obj[key].trim();
      } else if (Array.isArray(obj[key])) {
        if (obj[key].length) {
          temp[key] = obj[key];
        }
      } else {
        temp[key] = obj[key];
      }
    }
  });
  return temp;
};

export const deepCopy = (obj: object) => JSON.parse(JSON.stringify(obj));

export const formatNumber = (num: number) => new Intl.NumberFormat().format(num);
