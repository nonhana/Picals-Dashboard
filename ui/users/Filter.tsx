'use client';

import { UserOptions } from '@/utils/selectOptions';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, FormLabel, Input } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Selector from '../Selector';

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
      params.delete('keywords');
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
        <FormLabel>搜索用户</FormLabel>
        <Input
          size="sm"
          placeholder="请输入用户名"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput(e.target.value)}
          defaultValue={searchParams.get('keywords') || ''}
        />
      </FormControl>
      <Selector options={UserOptions} />
    </Box>
  );
}
