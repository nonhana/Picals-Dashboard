'use client';

import { getLabelListAPI } from '@/services/client/label';
import { WorkOptions } from '@/utils/selectOptions';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, FormLabel, Input } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Selector from '../Selector';

export default function WorkFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [labelOptions, setLabelOptions] = React.useState<
    { label: string; value: string }[]
  >([]);
  const [labelPage, setLabelPage] = React.useState(1);

  const addPage = () => setLabelPage((page) => page + 1);

  const fetchLabelList = React.useCallback(async () => {
    const data = await getLabelListAPI({ page: String(labelPage) });
    setLabelOptions((prev) =>
      prev.concat(
        data
          ? data.map((label) => ({ label: label.value, value: label.value }))
          : []
      )
    );
  }, [labelPage]);

  React.useEffect(() => {
    fetchLabelList();
  }, [fetchLabelList]);

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
        <FormLabel>发布者</FormLabel>
        <Input
          size="sm"
          placeholder="请输入发布者名称"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('user', e.target.value)}
          defaultValue={searchParams.get('user') || ''}
        />
      </FormControl>
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>插画家</FormLabel>
        <Input
          size="sm"
          placeholder="请输入插画家名称"
          startDecorator={<SearchIcon />}
          onChange={(e) => handleInput('illustrator', e.target.value)}
          defaultValue={searchParams.get('illustrator') || ''}
        />
      </FormControl>
      <Selector
        options={WorkOptions}
        loadFunc={addPage}
        loadOptions={labelOptions}
      />
    </Box>
  );
}
