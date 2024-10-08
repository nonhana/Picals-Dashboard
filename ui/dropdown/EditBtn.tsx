'use client';

import { getAdminDetailAPI, updateAdminAPI } from '@/services/client/admin';
import type { AdminForm } from '@/types';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import {
  Box,
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Input,
  MenuItem,
  Modal,
  ModalDialog,
  Option,
  Select,
  Stack,
} from '@mui/joy';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import * as React from 'react';
import PreviewModal from '../PreviewModal';
import toast from '../Toast';
import VisuallyHiddenInput from '../VisuallyHiddenInput';

const originForm: AdminForm = {
  id: '',
  name: '',
  email: '',
  status: 0,
  image: null,
};

export default function EditBtn() {
  const [visible, setVisible] = React.useState(false);
  const [form, setForm] = React.useState<AdminForm>(originForm);
  const [gettingInfo, setGettingInfo] = React.useState(false);

  const fetchSessionInfo = async () => {
    setGettingInfo(true);
    const session = await getSession();
    if (!session) {
      toast.error('未检测到登录信息，请重新登录');
      return;
    }
    if (!session.user) {
      toast.error('未检测到用户信息，请重新登录');
      return;
    }
    const { id } = session.user;
    if (!id) {
      toast.error('未检测到用户ID，请重新登录');
      return;
    }
    const data = await getAdminDetailAPI({ admin_id: id });
    if (data) setForm(data);
    setGettingInfo(false);
  };

  React.useEffect(() => {
    if (!visible) setForm(originForm);
    if (visible) fetchSessionInfo();
  }, [visible]);

  const [avatarUploading, setAvatarUploading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    setVisible(false);
    setForm(originForm);
  };

  const fileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (!targetFile) {
      toast.error('未检测到文件，请重新选择');
      return;
    }
    setAvatarUploading(true);
    const formData = new FormData();
    formData.append('image', targetFile);
    formData.append('imageType', 'thumbnail_cover');
    const res = await fetch('/api/tool/image-upload', {
      method: 'POST',
      body: formData,
    });
    const { thumbnail_url } = await res.json();
    setForm((prev) => ({
      ...prev,
      image: thumbnail_url,
    }));
    setAvatarUploading(false);
  };

  const handleEdit = async () => {
    setLoading(true);
    await updateAdminAPI(form);
    toast.success('个人信息修改成功，即将刷新页面');
    setLoading(false);
    setVisible(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState('');

  const handlePreview = () => {
    setPreviewSrc(form.image!);
    setPreviewVisible(true);
  };

  return (
    <>
      <MenuItem onClick={() => setVisible(true)}>
        <SettingsRoundedIcon />
        设置
      </MenuItem>
      <Modal open={visible} onClose={handleClose}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          sx={{ width: { sx: '50vw', sm: '35vw' }, overflow: 'auto' }}
        >
          <DialogTitle>
            <EditRoundedIcon />
            编辑管理员
          </DialogTitle>
          <Divider />
          <DialogContent>请修改该管理员的相关信息。</DialogContent>
          {!gettingInfo ? (
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>ID</FormLabel>
                <Input disabled required value={form.id} />
              </FormControl>
              <FormControl>
                <FormLabel>用户名</FormLabel>
                <Input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
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
                  {form.image && (
                    <Image
                      src={form.image}
                      alt="background"
                      width={60}
                      height={60}
                      style={{
                        objectFit: 'cover',
                        cursor: 'pointer',
                        borderRadius: '50%',
                      }}
                      onClick={handlePreview}
                    />
                  )}
                  <Button
                    loading={avatarUploading}
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
                <FormLabel>身份</FormLabel>
                <Select
                  defaultValue={form.status}
                  onChange={(_, value) =>
                    setForm((prev) => ({ ...prev, status: value as number }))
                  }
                >
                  <Option value={0}>管理员</Option>
                  <Option value={1}>游客</Option>
                </Select>
              </FormControl>
              <DialogActions>
                <Button loading={loading} onClick={handleEdit}>
                  提交修改
                </Button>
                <Button variant="plain" color="neutral" onClick={handleClose}>
                  取消修改
                </Button>
              </DialogActions>
            </Stack>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )}
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
