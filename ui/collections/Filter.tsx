'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, FormLabel, Input } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function CollectionFilter() {
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
        <FormLabel>用户id</FormLabel>
        <Input
          size="sm"
          placeholder="请输入用户id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('user_id', e.target.value)}
          defaultValue={searchParams.get('user_id') || ''}
        />
      </FormControl>
    </Box>
  );
}
