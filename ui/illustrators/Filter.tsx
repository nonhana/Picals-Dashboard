'use client';

import { IllustratorOptions } from '@/utils/selectOptions';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, FormLabel, Input } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Selector from '../Selector';

export default function IllustratorFilter() {
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
        <FormLabel>插画家id</FormLabel>
        <Input
          size="sm"
          placeholder="请输入插画家id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('id', e.target.value)}
          defaultValue={searchParams.get('id') || ''}
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>插画家名称</FormLabel>
        <Input
          size="sm"
          placeholder="请输入插画家名称"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('name', e.target.value)}
          defaultValue={searchParams.get('name') || ''}
        />
      </FormControl>
      <Selector options={IllustratorOptions} />
    </Box>
  );
}
