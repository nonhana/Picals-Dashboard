export const userTableHeads: {
  name: string;
  value: string;
  width?: number;
  sortable: boolean;
}[] = [
  {
    name: '用户id',
    value: 'id',
    width: 100,
    sortable: false,
  },
  {
    name: '用户名',
    value: 'username',
    width: 120,
    sortable: false,
  },
  {
    name: '邮箱',
    value: 'email',
    width: 150,
    sortable: false,
  },
  {
    name: '头像',
    value: 'avatar',
    width: 60,
    sortable: false,
  },
  {
    name: '背景图片',
    value: 'background_img',
    width: 120,
    sortable: false,
  },
  {
    name: '个性签名',
    value: 'signature',
    width: 150,
    sortable: false,
  },
  {
    name: '性别',
    value: 'gender',
    width: 60,
    sortable: false,
  },
  {
    name: '粉丝数',
    value: 'fan_count',
    width: 100,
    sortable: true,
  },
  {
    name: '关注数',
    value: 'follow_count',
    width: 100,
    sortable: true,
  },
  {
    name: '原创作品数',
    value: 'original_count',
    width: 120,
    sortable: true,
  },
  {
    name: '转载作品数',
    value: 'reprinted_count',
    width: 120,
    sortable: true,
  },
  {
    name: '状态',
    value: 'status',
    width: 100,
    sortable: false,
  },
  {
    name: '注册时间',
    value: 'created_time',
    width: 120,
    sortable: true,
  },
  {
    name: '操作',
    value: 'action',
    width: 60,
    sortable: false,
  },
];
