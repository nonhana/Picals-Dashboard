type TableHead = {
  name: string;
  value: string;
  width?: number;
  sortable: boolean;
};

export const userTableHeads: TableHead[] = [
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

export const workTableHeads: TableHead[] = [
  {
    name: '作品id',
    value: 'id',
    width: 100,
    sortable: false,
  },
  {
    name: '作品名',
    value: 'name',
    width: 120,
    sortable: false,
  },
  {
    name: '简介',
    value: 'intro',
    width: 150,
    sortable: false,
  },
  {
    name: '转载状态',
    value: 'reprintType',
    width: 100,
    sortable: false,
  },
  {
    name: '封面',
    value: 'cover',
    width: 60,
    sortable: false,
  },
  {
    name: '点赞数',
    value: 'like_count',
    width: 100,
    sortable: true,
  },
  {
    name: '浏览数',
    value: 'view_count',
    width: 100,
    sortable: true,
  },
  {
    name: '收藏数',
    value: 'collect_count',
    width: 100,
    sortable: true,
  },
  {
    name: '评论数',
    value: 'comment_count',
    width: 100,
    sortable: true,
  },
  {
    name: '原作url',
    value: 'original_url',
    width: 150,
    sortable: false,
  },
  {
    name: '状态',
    value: 'status',
    width: 100,
    sortable: false,
  },
  {
    name: '发布者',
    value: 'user_name',
    width: 120,
    sortable: false,
  },
  {
    name: '插画师',
    value: 'illustrator_name',
    width: 120,
    sortable: false,
  },
  {
    name: '发布时间',
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

export const illustratorTableHeads: TableHead[] = [
  {
    name: '插画师id',
    value: 'id',
    width: 100,
    sortable: false,
  },
  {
    name: '插画师名',
    value: 'name',
    width: 120,
    sortable: false,
  },
  {
    name: '简介',
    value: 'intro',
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
    name: '主页',
    value: 'home_url',
    width: 150,
    sortable: false,
  },
  {
    name: '作品数',
    value: 'work_count',
    width: 100,
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

export const labelTableHeads: TableHead[] = [
  {
    name: '标签id',
    value: 'id',
    width: 100,
    sortable: false,
  },
  {
    name: '标签名',
    value: 'value',
    width: 120,
    sortable: false,
  },
  {
    name: '标签颜色',
    value: 'color',
    width: 60,
    sortable: false,
  },
  {
    name: '标签封面',
    value: 'color',
    width: 60,
    sortable: false,
  },
  {
    name: '作品数',
    value: 'work_count',
    width: 100,
    sortable: true,
  },
  {
    name: '操作',
    value: 'action',
    width: 60,
    sortable: false,
  },
];

export const commentTableHeads: TableHead[] = [
  {
    name: '评论id',
    value: 'id',
    width: 100,
    sortable: false,
  },
  {
    name: '内容',
    value: 'content',
    width: 150,
    sortable: false,
  },
  {
    name: '等级',
    value: 'level',
    width: 100,
    sortable: false,
  },
  {
    name: '用户名',
    value: 'user_name',
    width: 120,
    sortable: false,
  },
  {
    name: '发布时间',
    value: 'createTime',
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
