'use client';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { Box, DialogTitle, Drawer, IconButton, ModalClose } from '@mui/joy';
import * as React from 'react';
import Sidebar from './Sidebar';

export default function OpenButtons() {
  const [open, setOpen] = React.useState(false);
  return (
    <Box sx={{ display: { xs: 'inline-flex', sm: 'none' } }}>
      <IconButton variant="plain" color="neutral" onClick={() => setOpen(true)}>
        <MenuRoundedIcon />
      </IconButton>
      <Drawer
        sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ModalClose />
        <DialogTitle>Picals Dashboard</DialogTitle>
        <Box sx={{ px: 1 }}>
          <Sidebar />
        </Box>
      </Drawer>
    </Box>
  );
}
