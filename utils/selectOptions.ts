import type { SelectOption } from '@/types';

export const UserOptions: SelectOption[] = [
  {
    label: '删除状态',
    value: 'deleted',
    options: [
      {
        label: '已删除',
        value: 'true',
      },
      {
        label: '未删除',
        value: 'false',
      },
    ],
  },
];

export const WorkOptions: SelectOption[] = [
  {
    label: '插画状态',
    value: 'status',
    options: [
      {
        label: '审核中',
        value: 0,
      },
      {
        label: '已发布',
        value: 1,
      },
      {
        label: '已删除',
        value: 2,
      },
    ],
  },
  {
    label: '转载状态',
    value: 'reprintType',
    options: [
      {
        label: '原创',
        value: 0,
      },
      {
        label: '转载',
        value: 1,
      },
      {
        label: '合集',
        value: 2,
      },
    ],
  },
  {
    label: '包含标签',
    value: 'label',
    multiple: true,
    options: [
      {
        label: '插画',
        value: '插画',
      },
      {
        label: '人物',
        value: '人物',
      },
      {
        label: '风景',
        value: '风景',
      },
      {
        label: '动物',
        value: '动物',
      },
      {
        label: '科幻',
        value: '科幻',
      },
    ],
  },
];

export const IllustratorOptions: SelectOption[] = [
  {
    label: '删除状态',
    value: 'deleted',
    options: [
      {
        label: '已删除',
        value: 'true',
      },
      {
        label: '未删除',
        value: 'false',
      },
    ],
  },
];

export const commentOptions: SelectOption[] = [
  {
    label: '评论等级',
    value: 'level',
    options: [
      {
        label: '一级评论',
        value: 0,
      },
      {
        label: '二级评论',
        value: 1,
      },
    ],
  },
];

export const imageOptions: SelectOption[] = [
  {
    label: '原图大小',
    value: 'originSizeRange',
    options: [
      {
        label: '5mb以下',
        value: '0',
      },
      {
        label: '5mb-10mb',
        value: '1',
      },
      {
        label: '10mb以上',
        value: '2',
      },
    ],
  },
  {
    label: '缩略图大小',
    value: 'thumbnailSizeRange',
    options: [
      {
        label: '0.5mb以下',
        value: '0',
      },
      {
        label: '0.5mb-1mb',
        value: '1',
      },
      {
        label: '1mb以上',
        value: '2',
      },
    ],
  },
];
