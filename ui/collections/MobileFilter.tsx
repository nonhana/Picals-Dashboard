'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Input, Sheet } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function CollectionMobileFilter() {
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
    <>
      <Sheet sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}>
        <Input
          size="sm"
          placeholder="请输入用户id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('user_id', e.target.value)}
          defaultValue={searchParams.get('user_id') || ''}
          sx={{ flexGrow: 1 }}
        />
      </Sheet>
    </>
  );
}
