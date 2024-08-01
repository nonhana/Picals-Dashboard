'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, FormLabel, Input } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import UserSelector from './Selector';

export default function UserFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleInput = useDebouncedCallback((keywords: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (keywords) {
      params.set('keywords', keywords);
    } else {
      params.delete('query');
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
        <FormLabel>Search for order</FormLabel>
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput(e.target.value)}
          defaultValue={searchParams.get('keywords') || ''}
        />
      </FormControl>
      <UserSelector />
    </Box>
  );
}
