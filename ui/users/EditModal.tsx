'use client';

import { getUserDetailAPI } from '@/services/client/user';
import type { UserForm } from '@/types';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Option,
  Select,
  Stack,
  styled,
} from '@mui/joy';
import Image from 'next/image';
import * as React from 'react';
import toast from '../Toast';

const originForm: UserForm = {
  username: '',
  email: '',
  avatar: '',
  signature: '',
  background_img: '',
  gender: 0,
  status: 0,
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

export default function UserEditModal({
  visible,
  userId,
  setVisible,
  handleEdit,
}: {
  visible: boolean;
  userId: string | undefined;
  setVisible: (visible: boolean) => void;
  handleEdit: () => void;
}) {
  const [form, setForm] = React.useState<UserForm>(originForm);

  React.useEffect(() => {
    if (!visible) setForm(originForm);
  }, [visible]);

  const fetchUserDetail = React.useCallback(async () => {
    if (!userId) return;
    const data = await getUserDetailAPI({ user_id: userId });
    if (data) {
      setForm(data);
    }
  }, [userId]);

  React.useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  const [fileUploading, setFileUploading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setVisible(false);
    setForm(originForm);
  };

  const fileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploading(true);
    const targetFile = e.target.files?.[0];
    if (!targetFile) {
      toast.error('未检测到文件，请重新选择');
      return;
    }
    const formData = new FormData();
    formData.append('image', targetFile);
    const res = await fetch('/api/tool/file-upload', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    setForm((prev) => ({ ...prev, avatar: data }));
    setFileUploading(false);
  };

  return (
    <Modal open={visible} onClose={handleClose}>
      <ModalDialog
        variant="outlined"
        role="alertdialog"
        sx={{ width: { sx: '50vw', sm: '35vw' }, overflow: 'auto' }}
      >
        <DialogTitle>
          <EditRoundedIcon />
          编辑用户
        </DialogTitle>
        <Divider />
        <DialogContent>请修改该用户的相关信息。</DialogContent>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>用户名</FormLabel>
            <Input
              autoFocus
              required
              value={form.username}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>邮箱</FormLabel>
            <Input
              required
              value={form.email}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>头像</FormLabel>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {form.avatar && (
                <Image
                  src={form.avatar}
                  alt="background"
                  width={60}
                  height={60}
                />
              )}
              <Button
                loading={fileUploading}
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                startDecorator={<UploadFileRoundedIcon />}
                sx={{ width: '100%' }}
              >
                上传头像
                <VisuallyHiddenInput type="file" onChange={fileSelected} />
              </Button>
            </Box>
          </FormControl>

          <FormControl>
            <FormLabel>背景图片</FormLabel>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {form.background_img && (
                <Image
                  src={form.background_img}
                  alt="background"
                  width={120}
                  height={60}
                />
              )}
              <Button
                component="label"
                role={undefined}
                tabIndex={-1}
                variant="outlined"
                color="neutral"
                startDecorator={<UploadFileRoundedIcon />}
                sx={{ width: '100%' }}
              >
                上传背景图
                <VisuallyHiddenInput type="file" />
              </Button>
            </Box>
          </FormControl>
          <FormControl>
            <FormLabel>个性签名</FormLabel>
            <Input
              value={form.signature}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, signature: e.target.value }))
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>性别</FormLabel>
            <Select
              defaultValue={form.gender}
              onChange={(_, value) =>
                setForm((prev) => ({ ...prev, gender: value as number }))
              }
            >
              <Option value={0}>男</Option>
              <Option value={1}>女</Option>
              <Option value={2}>未知</Option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>删除状态</FormLabel>
            <Select
              defaultValue={form.status}
              onChange={(_, value) =>
                setForm((prev) => ({ ...prev, status: value as number }))
              }
            >
              <Option value={0}>正常</Option>
              <Option value={1}>已删除</Option>
            </Select>
          </FormControl>

          <DialogActions>
            <Button onClick={handleEdit}>提交修改</Button>
            <Button variant="plain" color="neutral" onClick={handleClose}>
              取消修改
            </Button>
          </DialogActions>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
