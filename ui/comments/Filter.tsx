'use client';

import { commentOptions } from '@/utils/selectOptions';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, FormLabel, Input } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Selector from '../Selector';

export default function CommentFilter() {
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
        <FormLabel>评论内容</FormLabel>
        <Input
          size="sm"
          placeholder="请输入评论内容"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('content', e.target.value)}
          defaultValue={searchParams.get('content') || ''}
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>用户id</FormLabel>
        <Input
          size="sm"
          placeholder="请输入发布评论的用户id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('user_id', e.target.value)}
          defaultValue={searchParams.get('user_id') || ''}
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>插画id</FormLabel>
        <Input
          size="sm"
          placeholder="请输入插画id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('work_id', e.target.value)}
          defaultValue={searchParams.get('work_id') || ''}
        />
      </FormControl>
      <Selector options={commentOptions} />
    </Box>
  );
}
