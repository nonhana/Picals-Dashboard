'use client';

import SearchIcon from '@mui/icons-material/Search';
import { Input, Sheet } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function LabelMobileFilter() {
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
    <>
      <Sheet sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}>
        <Input
          size="sm"
          placeholder="请输入标签id"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('id', e.target.value)}
          defaultValue={searchParams.get('id') || ''}
          sx={{ flexGrow: 1 }}
        />
        <Input
          size="sm"
          placeholder="请输入标签名"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('value', e.target.value)}
          defaultValue={searchParams.get('value') || ''}
          sx={{ flexGrow: 1 }}
        />
      </Sheet>
    </>
  );
}
