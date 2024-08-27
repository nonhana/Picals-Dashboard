'use client';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy';
import { signOut } from 'next-auth/react';
import * as React from 'react';

export default function LogoutBtn() {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <MenuItem onClick={() => setVisible(true)}>
        <LogoutRoundedIcon />
        退出登录
      </MenuItem>
      <Modal open={visible} onClose={() => setVisible(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            注意
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography level="body-md">确定要退出登录吗？</Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => signOut()}>
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
    </>
  );
}
