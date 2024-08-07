'use client';

import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
} from '@mui/joy';
import NextImg from 'next/image';
import * as React from 'react';

export default function PreviewModal({
  visible,
  setVisible,
  src,
  handleDel,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  src: string;
  handleDel?: (url: string) => void;
}) {
  const [imageSize, setImageSize] = React.useState<{
    width: number;
    height: number;
  } | null>(null);

  React.useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  }, [src]);

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <ModalDialog
        variant="outlined"
        role="dialog"
        sx={{ minWidth: '480px', overflow: 'auto' }}
      >
        <ModalClose />
        <DialogTitle>
          <PhotoRoundedIcon />
          预览
        </DialogTitle>
        <Divider />
        <DialogContent>
          {imageSize && (
            <NextImg
              src={src}
              alt={src}
              width={imageSize.width}
              height={imageSize.height}
              style={{ margin: '0 auto' }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="solid" onClick={() => setVisible(false)}>
            关闭
          </Button>
          {handleDel && (
            <Button
              variant="solid"
              color="danger"
              onClick={() => handleDel(src)}
            >
              删除
            </Button>
          )}
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
