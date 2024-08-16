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
  }>({ width: 0, height: 0 });

  React.useEffect(() => {
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };
  }, [src]);

  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      sx={{
        transition: 'all 0.3s',
      }}
    >
      <ModalDialog variant="outlined" role="dialog" sx={{ overflow: 'auto' }}>
        <ModalClose />
        <DialogTitle>
          <PhotoRoundedIcon />
          预览
        </DialogTitle>
        <Divider />
        <DialogContent>
          <NextImg
            src={src}
            alt={src}
            width={imageSize.width}
            height={imageSize.height}
            style={{ margin: '0 auto' }}
          />
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
