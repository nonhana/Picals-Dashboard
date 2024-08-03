'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, FormLabel, Input } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function LabelFilter() {
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

  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.get('page')) {
      params.set('page', '1');
      replace(`${pathname}?${params.toString()}`);
    }
  }, [pathname, replace, searchParams]);

  return (
    <Box
      sx={{
        borderRadius: 'sm',
        py: 2,
        display: { xs: 'none', sm: 'flex' },
        flexWrap: 'wrap',
        gap: 1.5,
        '& > *': {
          minWidth: { xs: '120px', md: '160px' },
        },
      }}
    >
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>标签id</FormLabel>
        <Input
          size="sm"
          placeholder="请输入标签id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('id', e.target.value)}
          defaultValue={searchParams.get('id') || ''}
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>标签名</FormLabel>
        <Input
          size="sm"
          placeholder="请输入标签名"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('value', e.target.value)}
          defaultValue={searchParams.get('value') || ''}
        />
      </FormControl>
    </Box>
  );
}
