'use client';

import { getWorkDetailAPI } from '@/services/client/work';
import type { IllustrationInfo } from '@/types';
import { REPRINT_TYPE, WORK_STATUS } from '@/utils/constants';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import PreviewModal from '../PreviewModal';

const originInfo: IllustrationInfo = {
  id: '',
  name: '',
  intro: '',
  reprintType: 0,
  openComment: 0,
  isAIGenerated: 0,
  imgList: [],
  cover: '',
  original_url: '',
  like_count: 0,
  view_count: 0,
  collect_count: 0,
  comment_count: 0,
  created_time: '',
  updated_time: '',
  user_id: '',
  user_name: '',
  illustrator_id: '',
  illustrator_name: '',
  status: 0,
  labels: [],
};

export default function WorkDisplayModal({
  visible,
  setVisible,
  workId,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  workId: string | undefined;
}) {
  const [info, setInfo] = React.useState<IllustrationInfo>(originInfo);

  React.useEffect(() => {
    if (!visible) setInfo(originInfo);
  }, [visible]);

  const fetchWorkInfo = React.useCallback(async () => {
    if (!workId) return;
    const data = await getWorkDetailAPI({ work_id: workId });
    if (data) setInfo(data);
  }, [workId]);

  React.useEffect(() => {
    fetchWorkInfo();
  }, [fetchWorkInfo]);

  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState('');

  React.useEffect(() => {
    setPreviewVisible(previewSrc !== '');
  }, [previewSrc]);

  return (
    <>
      <Modal open={visible} onClose={() => setVisible(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          sx={{ width: '50vw', overflow: 'auto' }}
        >
          <DialogTitle>
            <PhotoRoundedIcon />
            详细信息
          </DialogTitle>
          <Divider />
          <DialogContent>
            罗列当前插画的详细信息，可点击进入编辑页进行修改。
          </DialogContent>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography level="h4">插画id</Typography>
              <Typography level="body-sm">{info.id}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography level="h4">插画名</Typography>
              <Typography level="body-sm">{info.name}</Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography level="h4">插画简介</Typography>
              <Typography level="body-sm">{info.intro}</Typography>
            </Stack>
            <Divider />
            <Stack spacing={1}>
              <Typography level="h4">转载类型</Typography>
              <Typography level="body-sm">
                {REPRINT_TYPE[info.reprintType]}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography level="h4">是否开启评论</Typography>
              <Typography level="body-sm">
                {info.openComment === 1 ? '开启' : '关闭'}
              </Typography>
            </Stack>
            <Stack spacing={1}>
              <Typography level="h4">是否为AI生成</Typography>
              <Typography level="body-sm">
                {info.isAIGenerated === 1 ? '是' : '否'}
              </Typography>
            </Stack>
            <Divider />
            <Stack spacing={1}>
              <Typography level="h4">封面</Typography>
              {info.cover && (
                <Box
                  sx={{
                    width: '100px',
                    height: '100px',
                    overflow: 'hidden',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={info.cover}
                    alt={info.cover}
                    width={100}
                    height={100}
                    style={{
                      objectFit: 'cover',
                    }}
                    onClick={() => setPreviewSrc(info.cover)}
                  />
                </Box>
              )}
            </Stack>
            <Stack spacing={1}>
              <Typography level="h4">图片列表</Typography>
              <Stack spacing={2} display="flex" direction="row">
                {info.imgList.map((src) => (
                  <Box
                    key={src}
                    sx={{
                      width: '100px',
                      height: '100px',
                      overflow: 'hidden',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src={src}
                      alt={src}
                      width={100}
                      height={100}
                      style={{
                        objectFit: 'cover',
                      }}
                      onClick={() => setPreviewSrc(src)}
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
            <Divider />
            <Stack
              display="flex"
              direction="row"
              justifyContent="space-between"
            >
              <Stack spacing={1} alignItems="center">
                <Typography level="h4">点赞数</Typography>
                <Typography level="body-sm">{info.like_count}</Typography>
              </Stack>
              <Stack spacing={1} alignItems="center">
                <Typography level="h4">浏览量</Typography>
                <Typography level="body-sm">{info.view_count}</Typography>
              </Stack>
              <Stack spacing={1} alignItems="center">
                <Typography level="h4">收藏量</Typography>
                <Typography level="body-sm">{info.collect_count}</Typography>
              </Stack>
              <Stack spacing={1} alignItems="center">
                <Typography level="h4">评论数</Typography>
                <Typography level="body-sm">{info.comment_count}</Typography>
              </Stack>
            </Stack>
            <Divider />
            {info.reprintType === 1 && (
              <>
                <Stack spacing={1}>
                  <Typography level="h4">原作地址</Typography>
                  <Link href={info.original_url!} target="_blank">
                    <Typography level="body-sm">
                      {info.original_url!}
                    </Typography>
                  </Link>
                </Stack>
                <Stack spacing={1}>
                  <Typography level="h4">原作者</Typography>
                  <Typography level="body-sm">
                    {info.illustrator_name!}
                  </Typography>
                </Stack>
              </>
            )}
            <Stack spacing={1}>
              <Typography level="h4">转载者</Typography>
              <Typography level="body-sm">{info.user_name!}</Typography>
            </Stack>
            <Divider />
            <Stack spacing={1}>
              <Typography level="h4">作品状态</Typography>
              <Typography level="body-sm">
                {WORK_STATUS[info.status]}
              </Typography>
            </Stack>

            <DialogActions>
              <Link href={`/dashboard/works/upload?work_id=${workId}`}>
                <Button>编辑</Button>
              </Link>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => setVisible(false)}
              >
                关闭
              </Button>
            </DialogActions>
          </Stack>
        </ModalDialog>
      </Modal>
      <PreviewModal
        visible={previewVisible}
        setVisible={setPreviewVisible}
        src={previewSrc}
      />
    </>
  );
}
