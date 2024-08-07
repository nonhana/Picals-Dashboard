'use client';

import {
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Sheet,
  Stack,
  Typography,
} from '@mui/joy';
import * as React from 'react';

type IllustratorCrawlerSetting = {
  illustratorId: string;
  limitType: number;
  limitValue: number;
  userId: string;
};

export default function CrawlerAuthorForm() {
  const [settings, setSettings] = React.useState<IllustratorCrawlerSetting>({
    illustratorId: '',
    limitType: 0,
    limitValue: 0,
    userId: '',
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  React.useEffect(() => {
    if (
      settings.illustratorId &&
      settings.limitValue &&
      settings.userId &&
      settings.limitType !== undefined
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [settings]);

  const handleSubmit = () => {
    console.log(settings);
    setButtonDisabled(true);
  };

  return (
    <Sheet
      sx={{
        maxWidth: { sm: '100%', md: '50%' },
        minWidth: { sm: '100%', md: '440px' },
        mx: 'auto',
        my: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">爬取插画家作品</Typography>
          <Typography level="body-sm">
            通过插画家的 Pixiv 主页 ID 爬取其作品
          </Typography>
        </Box>
        <Divider />
        <Stack direction="column" spacing={3}>
          <FormControl>
            <FormLabel>插画家 Pixiv ID</FormLabel>
            <Input
              size="sm"
              placeholder="请填写插画家的 Pixiv ID"
              defaultValue={settings.illustratorId}
              value={settings.illustratorId}
              onChange={(e) =>
                setSettings({ ...settings, illustratorId: e.target.value })
              }
              sx={{ flexGrow: 1 }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>用户 ID</FormLabel>
            <Input
              size="sm"
              placeholder="您希望由哪个用户上传这些作品？"
              defaultValue={settings.userId}
              value={settings.userId}
              onChange={(e) =>
                setSettings({ ...settings, userId: e.target.value })
              }
              sx={{ flexGrow: 1 }}
            />
          </FormControl>
          <FormControl sx={{ flexGrow: 1 }}>
            <FormLabel>限制条件</FormLabel>
            <RadioGroup
              orientation="horizontal"
              defaultValue={settings.limitType}
              onChange={(e) =>
                setSettings({ ...settings, limitType: Number(e.target.value) })
              }
            >
              <Radio value={0} label="限制作品个数" />
              <Radio value={1} label="限制爬取总大小" />
            </RadioGroup>
          </FormControl>
          {settings.limitType === 0 ? (
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>作品个数</FormLabel>
              <Input
                type="number"
                size="sm"
                placeholder="请填写希望爬取的最多作品个数"
                defaultValue={settings.limitValue}
                value={settings.limitValue}
                slotProps={{
                  input: {
                    min: 1,
                    max: 200,
                    step: 1,
                  },
                }}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    limitValue: Number(e.target.value),
                  })
                }
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          ) : (
            <FormControl sx={{ flexGrow: 1 }}>
              <FormLabel>爬取大小（MB）</FormLabel>
              <Input
                type="number"
                size="sm"
                placeholder="请填写希望爬取的总大小（MB）"
                defaultValue={settings.limitValue}
                value={settings.limitValue}
                slotProps={{
                  input: {
                    min: 1,
                    max: 1024,
                    step: 1,
                  },
                }}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    limitValue: Number(e.target.value),
                  })
                }
                sx={{ flexGrow: 1 }}
              />
            </FormControl>
          )}
        </Stack>
        <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
            <Button
              size="sm"
              variant="solid"
              disabled={buttonDisabled}
              onClick={handleSubmit}
            >
              提交
            </Button>
          </CardActions>
        </CardOverflow>
      </Card>
      <Card>
        <Box sx={{ mb: 1 }}>
          <Typography level="title-md">检索结果</Typography>
          <Typography level="body-sm">
            按照您的条件检索到的作品将会显示在这里
          </Typography>
        </Box>
        <Divider />
      </Card>
    </Sheet>
  );
}
