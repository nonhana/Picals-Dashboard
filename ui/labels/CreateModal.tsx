'use client';

import { useHash } from '@/hooks';
import { uploadLabelAPI } from '@/services/client/label';
import type { LabelForm } from '@/types';
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
  Stack,
} from '@mui/joy';
import { Sketch } from '@uiw/react-color';
import Image from 'next/image';
import * as React from 'react';
import PreviewModal from '../PreviewModal';
import toast from '../Toast';
import VisuallyHiddenInput from '../VisuallyHiddenInput';

const originForm: LabelForm = {
  value: '',
  color: '',
  cover: null,
};

export default function LabelCreateModal() {
  const [visible, setVisible] = React.useState(false);
  const [hash, _, cleanHash] = useHash();
  React.useEffect(() => {
    if (hash === '#upload') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [hash]);

  const [form, setForm] = React.useState<LabelForm>(originForm);

  React.useEffect(() => {
    if (!visible) setForm(originForm);
  }, [visible]);

  const [coverUploading, setCoverUploading] = React.useState(false);
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
    setCoverUploading(true);
    const res = await fetch('/api/tool/image-upload', {
      method: 'POST',
      body: formData,
    });
    const { origin_url } = await res.json();
    setForm((prev) => ({
      ...prev,
      cover: origin_url,
    }));
    setCoverUploading(false);
  };

  const handleEdit = async () => {
    setLoading(true);
    await uploadLabelAPI(form);
    toast.success('新建标签成功');
    setVisible(false);
    setLoading(false);
  };

  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState('');

  const handlePreview = () => {
    setPreviewSrc(form.cover!);
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
            编辑标签信息
          </DialogTitle>
          <Divider />
          <DialogContent>请修改该标签的相关信息。</DialogContent>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>标签名</FormLabel>
              <Input
                required
                value={form.value}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, value: e.target.value }))
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>标签颜色</FormLabel>
              <Input
                sx={{ backgroundColor: form.color }}
                disabled
                required
                value={form.color}
              />
              <Sketch
                style={{ margin: '20px auto 0' }}
                color={form.color}
                onChange={(color) => {
                  setForm((prev) => ({ ...prev, color: color.hex }));
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>标签封面</FormLabel>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                {form.cover && (
                  <Stack
                    width={60}
                    height={60}
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      cursor: 'pointer',
                      borderRadius: '50%',
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={form.cover}
                      alt="background"
                      width={60}
                      height={60}
                      style={{
                        objectFit: 'cover',
                      }}
                      onClick={handlePreview}
                    />
                  </Stack>
                )}
                <Button
                  loading={coverUploading}
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                  variant="outlined"
                  color="neutral"
                  startDecorator={<UploadFileRoundedIcon />}
                  sx={{ width: '100%' }}
                >
                  上传封面
                  <VisuallyHiddenInput type="file" onChange={fileSelected} />
                </Button>
              </Box>
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
