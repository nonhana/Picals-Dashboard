'use client';

import { getAdminDetailAPI, updateAdminAPI } from '@/services/client/admin';
import type { AdminForm } from '@/types';
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
} from '@mui/joy';
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

export default function EditModal({
  visible,
  setVisible,
  adminId,
  refresh,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  adminId: string | undefined;
  refresh: () => void;
}) {
  const [form, setForm] = React.useState<AdminForm>(originForm);

  React.useEffect(() => {
    if (!visible) setForm(originForm);
  }, [visible]);

  const fetchAdminDetail = React.useCallback(async () => {
    if (!adminId) return;
    const data = await getAdminDetailAPI({ admin_id: adminId });
    if (data) {
      setForm(data);
    }
  }, [adminId]);

  React.useEffect(() => {
    fetchAdminDetail();
  }, [fetchAdminDetail]);

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
    toast.success('管理员信息修改成功');
    refresh();
    setVisible(false);
    setLoading(false);
  };

  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState('');

  const handlePreview = () => {
    setPreviewSrc(form.image!);
    setPreviewVisible(true);
  };

  return (
    <>
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
                <Option value={0}>游客</Option>
                <Option value={1}>管理员</Option>
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
