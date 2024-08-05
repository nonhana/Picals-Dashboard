'use client';

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

export default function UserDelModal({
  visible,
  setVisible,
  handle,
  message,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handle: () => void;
  message: string;
}) {
  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
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
          <Button
            variant="plain"
            color="neutral"
            onClick={() => setVisible(false)}
          >
            取消
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
}
