import type {
  comments,
  favorites,
  illustrations,
  illustrators,
  images,
  labels,
  users,
} from '@prisma/client';

// TODO: status 为临时数据，后续需要从数据库获取类型
type User = Omit<
  users,
  | 'password'
  | 'updated_time'
  | 'little_avatar'
  | 'like_count'
  | 'collect_count'
  | 'favorite_count'
> & { status: number };

export const userTableData: User[] = Array.from({ length: 30 }, (_, index) => ({
  id: String(index),
  username: `user${index}`,
  email: `user${index}@gmail.com`,
  background_img: null,
  avatar: 'https://dummyimage.com/32x32',
  signature: `signature${index}`,
  gender: index % 2,
  fan_count: index,
  follow_count: index,
  origin_count: index,
  reprinted_count: index,
  created_time: new Date(),
  status: index % 2,
}));

type Illustration = Omit<
  illustrations,
  | 'imgList'
  | 'created_time'
  | 'updated_time'
  | 'user_id'
  | 'illustrator_id'
  | 'openComment'
  | 'isAIGenerated'
> & {
  status: number;
  imgList: string[];
  user_name: string;
  illustrator_name: string;
  created_time: string;
};

export const IllustrationTableData: Illustration[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: String(index),
    name: `illustration${index}`,
    intro: `intro${index}`,
    reprintType: index % 3,
    imgList: Array<string>(10).fill('https://dummyimage.com/400X400'),
    cover: 'https://dummyimage.com/400X400',
    like_count: index,
    view_count: index,
    collect_count: index,
    comment_count: index,
    original_url: index % 2 ? 'https://dummyimage.com/400X400' : null,
    status: index % 3,
    user_name: `user${index}`,
    illustrator_name: `illustrator${index}`,
    created_time: '2021-08-01',
  })
);

type Illustrator = Omit<illustrators, 'updated_time' | 'created_time'> & {
  status: number;
  created_time: string;
};

export const IllustratorTableData: Illustrator[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: String(index),
    name: `illustrator${index}`,
    avatar: index % 2 ? 'https://dummyimage.com/32x32' : null,
    intro: `intro${index}`,
    home_url: 'https://www.pixiv.net/users/47945116',
    work_count: index,
    status: index % 2,
    created_time: '2021-08-01',
  })
);

type Label = labels;

export const LabelTableData: Label[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: String(index),
    value: `label${index}`,
    color: '#000000',
    cover: index % 2 ? 'https://dummyimage.com/32x32' : null,
    work_count: index,
  })
);

type Comment = Omit<
  comments,
  | 'res_to_comment_id'
  | 'res_to_user_id'
  | 'createTime'
  | 'user_id'
  | 'illustration_id'
> & {
  createTime: string;
  user_name: string;
};

export const CommentTableData: Comment[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: String(index),
    content: `content${index}`,
    level: index % 2,
    createTime: '2021-08-01',
    user_name: `user${index}`,
  })
);

type Image = images & { originSize: number; thumbnailSize: number };

export const ImageTableData: Image[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: String(index),
    originUrl: 'https://dummyimage.com/400X400',
    originWidth: 400,
    originHeight: 400,
    originSize: 7.62,
    thumbnailUrl: 'https://dummyimage.com/200X200',
    thumbnailWidth: 200,
    thumbnailHeight: 200,
    thumbnailSize: 1.91,
    illustration_id: index % 2 ? String(index) : null,
  })
);

// created_at: Date;
// updated_at: Date;
// user_id: string | null;

type Collection = Omit<favorites, 'created_at' | 'updated_at' | 'user_id'> & {
  created_at: string;
  user_name: string;
};

export const CollectionTableData: Collection[] = Array.from(
  { length: 30 },
  (_, index) => ({
    id: String(index),
    name: `collection${index}`,
    introduce: `introduce${index}`,
    cover: index % 2 ? 'https://dummyimage.com/400X400' : null,
    order: index,
    work_count: index,
    created_at: '2021-08-01',
    user_name: `user${index}`,
  })
);
