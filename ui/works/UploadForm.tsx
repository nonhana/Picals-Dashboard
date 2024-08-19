'use client';

import { getIllustratorListAPI } from '@/services/client/illustrator';
import { getLabelListAPI } from '@/services/client/label';
import { getUserListAPI } from '@/services/client/user';
import { getWorkDetailAPI, uploadWorkAPI } from '@/services/client/work';
import type { IllustrationForm } from '@/types';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Sheet,
  Stack,
  styled,
  Textarea,
  Typography,
} from '@mui/joy';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import toast from '../Toast';
import DraggableImg from './DraggableImg';

const originForm: IllustrationForm = {
  name: '',
  intro: '',
  reprintType: 0,
  openComment: 0,
  isAIGenerated: 0,
  imgList: [],
  original_url: null,
  illustrator_id: null,
  illustrator_name: null,
  status: 0,
  labels: [],
  author_id: '',
  author_name: '',
};

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export default function UploadForm() {
  const searchParams = useSearchParams();
  const workId = searchParams.get('work_id');

  const [gettingInfo, setGettingInfo] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [formInfo, setFormInfo] = React.useState<IllustrationForm>(originForm);

  /* ----------图片列表相关---------- */
  const [imgList, setImgList] = React.useState<string[]>([]);

  const onDelete = (url: string) => {
    const newImgList = imgList.filter((src) => src !== url);
    setImgList(newImgList);
  };

  //拖拽传感器，在移动像素5px范围内，不触发拖拽事件
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // 拖拽结束后的操作
  const dragEndEvent = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = imgList.findIndex((url) => url === active.id);
      const newIndex = imgList.findIndex((url) => url === over.id);
      const newImgList = arrayMove(imgList, oldIndex, newIndex);
      setImgList(newImgList);
    }
  };

  /* ----------插画家列表相关---------- */
  const [illustratorOptions, setIllustratorOptions] = React.useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [illustratorKeyword, setIllustratorKeyword] = React.useState('');
  const [selectedIllustrator, setSelectedIllustrator] = React.useState<{
    label: string;
    value: string;
  } | null>(null);

  const fetchIllustratorList = async (debouncedKeyword: string) => {
    const data = await getIllustratorListAPI({ name: debouncedKeyword });
    if (data) {
      const options = data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setIllustratorOptions(options);
    }
  };

  const debouncedFetchIllustratorList = useDebouncedCallback(
    (debouncedKeyword) => {
      fetchIllustratorList(debouncedKeyword);
    },
    300
  );

  React.useEffect(() => {
    if (illustratorKeyword) {
      debouncedFetchIllustratorList(illustratorKeyword);
    } else {
      setIllustratorOptions([]);
    }
  }, [illustratorKeyword, debouncedFetchIllustratorList]);

  /* ----------标签列表相关---------- */
  const [labelOptions, setLabelOptions] = React.useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [labelKeyword, setLabelKeyword] = React.useState('');
  const [selectedLabels, setSelectedLabels] = React.useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const fetchLabelList = async (debouncedKeyword: string) => {
    const data = await getLabelListAPI({ value: debouncedKeyword });
    if (data) {
      const options = data
        .map((item) => ({
          label: item.value,
          value: item.id,
        }))
        .filter(
          (item) => !selectedLabels.some((label) => label.value === item.value)
        );
      setLabelOptions(options);
    }
  };

  const debouncedFetchLabelList = useDebouncedCallback((debouncedKeyword) => {
    fetchLabelList(debouncedKeyword);
  }, 300);

  React.useEffect(() => {
    if (labelKeyword) {
      debouncedFetchLabelList(labelKeyword);
    } else {
      setLabelOptions([]);
    }
  }, [labelKeyword, debouncedFetchLabelList]);

  /* ----------用户列表相关---------- */
  const [userOptions, setUserOptions] = React.useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [userKeyword, setUserKeyword] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState<{
    label: string;
    value: string;
  } | null>(null);

  const fetchUserList = async (debouncedKeyword: string) => {
    const data = await getUserListAPI({ name: debouncedKeyword });
    if (data) {
      const options = data.map((item) => ({
        label: item.username,
        value: item.id,
      }));
      setUserOptions(options);
    }
  };

  const debouncedFetchUserList = useDebouncedCallback((debouncedKeyword) => {
    fetchUserList(debouncedKeyword);
  }, 300);

  React.useEffect(() => {
    if (userKeyword) {
      debouncedFetchUserList(userKeyword);
    } else {
      setUserOptions([]);
    }
  }, [userKeyword, debouncedFetchUserList]);

  const fileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (!targetFile) {
      toast.error('未检测到文件，请重新选择');
      return;
    }
    const formData = new FormData();
    formData.append('image', targetFile);
  };

  const fetchWorkDetail = React.useCallback(async () => {
    if (!workId) return;
    setGettingInfo(true);
    const data = await getWorkDetailAPI({ work_id: workId });
    if (data) {
      setFormInfo({
        name: data.name,
        intro: data.intro,
        reprintType: data.reprintType,
        openComment: data.openComment,
        isAIGenerated: data.isAIGenerated,
        imgList: data.imgList,
        original_url: data.original_url,
        illustrator_id: data.illustrator_id,
        illustrator_name: data.illustrator_name,
        status: data.status,
        labels: data.labels,
        author_id: data.user_id!,
        author_name: data.user_name!,
      });
      setImgList(data.imgList);
      setSelectedLabels(data.labels);
      setSelectedIllustrator({
        label: data.illustrator_name ?? '',
        value: data.illustrator_id ?? '',
      });
    }
    setGettingInfo(false);
  }, [workId]);

  React.useEffect(() => {
    fetchWorkDetail();
  }, [fetchWorkDetail]);

  const handleUpload = async () => {
    setLoading(true);
    const result: IllustrationForm = {
      ...formInfo,
      imgList,
      illustrator_id: selectedIllustrator?.value ?? null,
      illustrator_name: selectedIllustrator?.label ?? null,
      labels: selectedLabels,
    };
    if (workId) result.id = workId;
    const data = await uploadWorkAPI(result);
    if (data) {
      if (data === 'success') {
        toast.success(workId ? '更新作品信息成功' : '上传成功');
      }
    }
    setLoading(false);
  };

  return (
    <Sheet
      sx={{
        mx: 'auto',
        my: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">插画基本信息</Typography>
          <Typography level="body-sm">
            请填写插画的基本信息，这些信息将会展示在插画详情页
          </Typography>
        </Box>
        <Divider />
        {!gettingInfo ? (
          <Stack direction="column" spacing={3}>
            <FormControl>
              <FormLabel>作品名称</FormLabel>
              <Input
                size="sm"
                placeholder="请填写插画名称（可选）"
                defaultValue={formInfo.name}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, name: e.target.value })
                }
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>作品简介</FormLabel>
              <Textarea
                size="sm"
                placeholder="请填写插画简介（可选）"
                defaultValue={formInfo.intro}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, intro: e.target.value })
                }
                sx={{ flexGrow: 1 }}
                minRows={3}
                maxRows={6}
              />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>插画标签</FormLabel>
              <Autocomplete
                multiple
                placeholder="请搜索想要添加的标签"
                type="search"
                freeSolo
                disableClearable
                options={labelOptions}
                defaultValue={formInfo.labels}
                onChange={(_, v) =>
                  setSelectedLabels(v as { label: string; value: string }[])
                }
                inputValue={labelKeyword}
                onInputChange={(_, v) => setLabelKeyword(v)}
              />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>发布者</FormLabel>
              <Autocomplete
                placeholder="请搜索该作品的发布者"
                type="search"
                freeSolo
                disableClearable
                options={userOptions}
                defaultValue={{
                  value: formInfo.author_id,
                  label: formInfo.author_name,
                }}
                onChange={(_, v) =>
                  setSelectedUser(v as { label: string; value: string })
                }
                inputValue={userKeyword}
                onInputChange={(_, v) => setUserKeyword(v)}
              />
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>是否开启评论</FormLabel>
              <RadioGroup
                orientation="horizontal"
                value={formInfo.openComment}
                onChange={(event) =>
                  setFormInfo({
                    ...formInfo,
                    openComment: Number(event.target.value),
                  })
                }
              >
                <Radio value={0} label="关闭" />
                <Radio value={1} label="开启" />
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>是否为AI生成</FormLabel>
              <RadioGroup
                orientation="horizontal"
                value={formInfo.isAIGenerated}
                onChange={(event) =>
                  setFormInfo({
                    ...formInfo,
                    isAIGenerated: Number(event.target.value),
                  })
                }
              >
                <Radio value={0} label="否" />
                <Radio value={1} label="是" />
              </RadioGroup>
            </FormControl>
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>转载状态</FormLabel>
              <RadioGroup
                orientation="horizontal"
                value={formInfo.reprintType}
                onChange={(event) =>
                  setFormInfo({
                    ...formInfo,
                    reprintType: Number(event.target.value),
                  })
                }
              >
                <Radio value={0} label="原创作品" />
                <Radio value={1} label="转载作品" />
                <Radio value={2} label="合集作品" />
              </RadioGroup>
            </FormControl>
            {formInfo.reprintType !== 0 && (
              <Stack direction="row" spacing={3}>
                {formInfo.reprintType === 1 && (
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>作品URL</FormLabel>
                    <Input
                      size="sm"
                      placeholder="请填写原作URL地址"
                      defaultValue={formInfo.original_url ?? ''}
                      onChange={(e) =>
                        setFormInfo({
                          ...formInfo,
                          original_url: e.target.value,
                        })
                      }
                      sx={{ flexGrow: 1 }}
                    />
                  </FormControl>
                )}
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>原作者</FormLabel>
                  <Autocomplete
                    placeholder="请搜索原作者"
                    type="search"
                    freeSolo
                    disableClearable
                    options={illustratorOptions}
                    defaultValue={{
                      value: formInfo.illustrator_id ?? '',
                      label: formInfo.illustrator_name ?? '',
                    }}
                    onChange={(_, v) =>
                      setSelectedIllustrator(
                        v as { label: string; value: string }
                      )
                    }
                    inputValue={illustratorKeyword}
                    onInputChange={(_, value) => setIllustratorKeyword(value)}
                  />
                </FormControl>
              </Stack>
            )}
          </Stack>
        ) : (
          <CircularProgress sx={{ margin: '0 auto' }} />
        )}
      </Card>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">图片列表</Typography>
          <Typography level="body-sm">
            请上传插画图片，支持多张图片上传并排序
          </Typography>
        </Box>
        <Divider />
        {!gettingInfo ? (
          <Stack direction="column" spacing={3}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <DndContext
                onDragEnd={dragEndEvent}
                modifiers={[restrictToParentElement]}
                sensors={sensors}
              >
                <SortableContext items={imgList} strategy={rectSortingStrategy}>
                  {imgList.map((url) => (
                    <DraggableImg
                      key={url}
                      id={url}
                      src={url}
                      onDelete={onDelete}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </Box>
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              variant="outlined"
              color="neutral"
              startDecorator={<UploadFileRoundedIcon />}
              sx={{ width: '100%' }}
            >
              上传图片
              <VisuallyHiddenInput type="file" onChange={fileSelected} />
            </Button>
          </Stack>
        ) : (
          <CircularProgress sx={{ margin: '0 auto' }} />
        )}
      </Card>
      <Card>
        <Button loading={loading} onClick={handleUpload}>
          提交
        </Button>
      </Card>
    </Sheet>
  );
}
