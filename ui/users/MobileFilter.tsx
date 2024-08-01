'use client';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from '@mui/joy';
import * as React from 'react';
import UserSelector from './Selector';

export default function UserMobileFilter() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet
      className="SearchAndFilters-mobile"
      sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
    >
      <Input
        size="sm"
        placeholder="Search"
        startDecorator={<SearchIcon />}
        sx={{ flexGrow: 1 }}
      />
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <FilterAltIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
          <ModalClose />
          <Typography id="filter-modal" level="h2">
            Filters
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <UserSelector />
            <Button color="primary" onClick={() => setOpen(false)}>
              Submit
            </Button>
          </Sheet>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
}
