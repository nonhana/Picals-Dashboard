'use client';

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

export default function ChooseCrawler({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <ModalDialog
        variant="outlined"
        role="dialog"
        sx={{ minWidth: '480px', overflow: 'auto' }}
      >
        <ModalClose />
        <DialogTitle>选择爬取方式</DialogTitle>
        <Divider />
        <DialogContent sx={{ gap: 2 }}>
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
