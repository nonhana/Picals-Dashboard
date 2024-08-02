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
  handleDel,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  handleDel: () => void;
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
          <Typography level="body-md">确定要删除该用户吗？</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="solid" color="danger" onClick={handleDel}>
            删除
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
