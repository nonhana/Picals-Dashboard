'use client';

import { AdminOptions } from '@/utils/selectOptions';
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Selector from '../Selector';

export default function AdminMobileFilter() {
  const [open, setOpen] = React.useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleInput = useDebouncedCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Sheet
      className="SearchAndFilters-mobile"
      sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
    >
      <Input
        size="sm"
        placeholder="请输入用户名"
        startDecorator={<SearchIcon />}
        onChange={(e) => handleInput('name', e.target.value)}
        defaultValue={searchParams.get('name') || ''}
      />
      <Input
        size="sm"
        placeholder="请输入邮箱"
        startDecorator={<SearchIcon />}
        onChange={(e) => handleInput('email', e.target.value)}
        defaultValue={searchParams.get('email') || ''}
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
            筛选
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Selector options={AdminOptions} />
            <Button color="primary" onClick={() => setOpen(false)}>
              确定
            </Button>
          </Sheet>
        </ModalDialog>
      </Modal>
    </Sheet>
  );
}