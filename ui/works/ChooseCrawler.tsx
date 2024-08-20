'use client';

import { useHash } from '@/hooks';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
} from '@mui/joy';
import * as React from 'react';

export default function ChooseCrawler() {
  const [visible, setVisible] = React.useState(false);

  const [hash, _, cleanHash] = useHash();
  React.useEffect(() => {
    console.log('hash:', hash);
    if (hash === '#chooseCrawler') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [hash]);

  const handleClose = () => {
    cleanHash();
  };

  return (
    <Modal open={visible} onClose={handleClose}>
      <ModalDialog
        variant="outlined"
        role="dialog"
        sx={{ minWidth: '480px', overflow: 'auto' }}
      >
        <ModalClose />
        <DialogTitle>选择爬取方式</DialogTitle>
        <Divider />
        <DialogContent sx={{ gap: 4, padding: 2 }}>
          <Button
            component="a"
            startDecorator={<SchoolRoundedIcon />}
            href="/dashboard/works/crawler-author"
            variant="solid"
            onClick={() => setVisible(false)}
          >
            爬取作者
          </Button>
          <Button
            component="a"
            startDecorator={<LabelRoundedIcon />}
            href="/dashboard/works/crawler-tag"
            variant="solid"
            onClick={() => setVisible(false)}
          >
            爬取标签
          </Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
}
