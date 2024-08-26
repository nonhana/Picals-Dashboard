'use client';

import { useHash } from '@/hooks';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy';
import * as React from 'react';

export default function AlertModal({
  message,
  handle,
}: {
  handle: () => void;
  message: string;
}) {
  const [visible, setVisible] = React.useState(false);
  const [hash, _, cleanHash] = useHash();
  React.useEffect(() => {
    if (hash === '#logout') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [hash]);

  return (
    <Modal open={visible} onClose={cleanHash}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>
          <WarningRoundedIcon />
          注意
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography level="body-md">{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={handle}>
            确定
          </Button>
          <Button variant="plain" color="neutral" onClick={cleanHash}>
            取消
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
