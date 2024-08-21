'use client';

import { useHash } from '@/hooks';
import { uploadIllustratorAPI } from '@/services/client/illustrator';
import type { IllustratorForm } from '@/types';
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

const originForm: IllustratorForm = {
  name: '',
  intro: '',
  avatar: null,
  little_avatar: null,
  home_url: '',
  status: 0,
};

export default function IllustratorCreateModal() {
  const [visible, setVisible] = React.useState(false);
  const [hash, _, cleanHash] = useHash();
  React.useEffect(() => {
    if (hash === '#upload') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [hash]);

  const [form, setForm] = React.useState<IllustratorForm>(originForm);

  React.useEffect(() => {
    if (!visible) setForm(originForm);
  }, [visible]);

  const [avatarUploading, setAvatarUploading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClose = () => {
    cleanHash();
    setForm(originForm);
  };

  const fileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (!targetFile) {
      toast.error('未检测到文件，请重新选择');
      return;
    }
    const formData = new FormData();
    formData.append('image', targetFile);
    setAvatarUploading(true);
    formData.append('imageType', 'avatar');
    const res = await fetch('/api/tool/image-upload', {
      method: 'POST',
      body: formData,
    });
    const { origin_url, thumbnail_url } = await res.json();
    setForm((prev) => ({
      ...prev,
      avatar: origin_url,
      little_avatar: thumbnail_url,
    }));
    setAvatarUploading(false);
  };

  const handleEdit = async () => {
    setLoading(true);
    await uploadIllustratorAPI(form);
    toast.success('新建插画家成功');
    setVisible(false);
    setLoading(false);
  };

  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState('');

  const handlePreview = () => {
    setPreviewSrc(form.avatar!);
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
            编辑插画家信息
          </DialogTitle>
          <Divider />
          <DialogContent>请修改该插画家的相关信息。</DialogContent>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>插画家用户名</FormLabel>
              <Input
                autoFocus
                required
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>插画家简介</FormLabel>
              <Input
                required
                value={form.intro}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, intro: e.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>插画家头像</FormLabel>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {form.little_avatar && (
                  <Image
                    src={form.little_avatar}
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
              <FormLabel>个人主页（如Pixiv）</FormLabel>
              <Input
                value={form.home_url}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, home_url: e.target.value }))
                }
              />
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
