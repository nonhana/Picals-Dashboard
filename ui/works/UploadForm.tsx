'use client';
import { TestImgList } from '@/test/data';
import type { IllustrationFormInfo } from '@/types';
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
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Option,
  Radio,
  RadioGroup,
  Select,
  Sheet,
  Stack,
  styled,
  Textarea,
  Typography,
} from '@mui/joy';
import * as React from 'react';
import DraggableImg from './DraggableImg';

const illustratorOptions = [
  { label: '插画家1', value: 0 },
  { label: '插画家2', value: 1 },
  { label: '插画家3', value: 2 },
];

const originForm: IllustrationFormInfo = {
  name: '',
  intro: '',
  reprintType: 0,
  openComment: 0,
  isAIGenerated: 0,
  imgList: '',
  original_url: null,
  user_id: null,
  illustrator_id: null,
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
  const [formInfo, setFormInfo] =
    React.useState<IllustrationFormInfo>(originForm);
  const [imgList, setImgList] = React.useState<string[]>(TestImgList);

  const onDelete = (url: string) => {
    const newImgList = imgList.filter((src) => src !== url);
    setImgList(newImgList);
  };

  /* ----------图片列表拖曳排序相关---------- */
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

  return (
    <Sheet
      sx={{
        maxWidth: { sm: '100%', md: '50%' },
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
        <Stack direction="column" spacing={3}>
          <FormControl>
            <FormLabel>作品名称</FormLabel>
            <Input
              size="sm"
              placeholder="请填写插画名称（可选）"
              defaultValue={formInfo.name}
              value={formInfo.name}
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
              value={formInfo.intro}
              onChange={(e) =>
                setFormInfo({ ...formInfo, intro: e.target.value })
              }
              sx={{ flexGrow: 1 }}
              minRows={3}
              maxRows={6}
            />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>是否开启评论</FormLabel>
            <RadioGroup
              orientation="horizontal"
              defaultValue={formInfo.openComment}
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
              defaultValue={formInfo.isAIGenerated}
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
              defaultValue={formInfo.reprintType}
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
                    value={formInfo.original_url ?? ''}
                    onChange={(e) =>
                      setFormInfo({ ...formInfo, original_url: e.target.value })
                    }
                    sx={{ flexGrow: 1 }}
                  />
                </FormControl>
              )}
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>原作者</FormLabel>
                <Select
                  placeholder="请选择原作者"
                  size="sm"
                  slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
                  onChange={(_, value) =>
                    setFormInfo({ ...formInfo, illustrator_id: value })
                  }
                  defaultValue={formInfo.illustrator_id}
                >
                  {illustratorOptions.map((o) => (
                    <Option key={o.value} value={o.value}>
                      {o.label}
                    </Option>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          )}
        </Stack>
      </Card>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">图片列表</Typography>
          <Typography level="body-sm">
            请上传插画图片，支持多张图片上传并排序
          </Typography>
        </Box>
        <Divider />
        <Stack direction="column" spacing={3}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
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
            <VisuallyHiddenInput type="file" />
          </Button>
        </Stack>
      </Card>
    </Sheet>
  );
}
