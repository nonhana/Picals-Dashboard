'use client';

import { WorkOptions } from '@/utils/selectOptions';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, FormLabel, Input } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Selector from '../Selector';

export default function WorkFilter() {
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
        <FormLabel>作品id</FormLabel>
        <Input
          size="sm"
          placeholder="请输入作品id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('id', e.target.value)}
          defaultValue={searchParams.get('id') || ''}
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>发布者id</FormLabel>
        <Input
          size="sm"
          placeholder="请输入发布者id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('user_id', e.target.value)}
          defaultValue={searchParams.get('user_id') || ''}
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>插画家id</FormLabel>
        <Input
          size="sm"
          placeholder="请输入插画家id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('illustrator_id', e.target.value)}
          defaultValue={searchParams.get('illustrator_id') || ''}
        />
      </FormControl>
      <Selector options={WorkOptions} />
    </Box>
  );
}
