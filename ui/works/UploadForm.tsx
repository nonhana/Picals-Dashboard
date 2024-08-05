'use client';
import type { IllustrationFormInfo } from '@/types';
import {
  Box,
  Card,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Option,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from '@mui/joy';
import * as React from 'react';

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

export default function UploadForm() {
  const [formInfo, setFormInfo] =
    React.useState<IllustrationFormInfo>(originForm);

  return (
    <>
      <Card sx={{ maxWidth: '50%', mx: 'auto', my: 1 }}>
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
            <Input
              size="sm"
              placeholder="请填写插画简介（可选）"
              defaultValue={formInfo.intro}
              value={formInfo.intro}
              onChange={(e) =>
                setFormInfo({ ...formInfo, intro: e.target.value })
              }
              sx={{ flexGrow: 1 }}
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
    </>
  );
}
