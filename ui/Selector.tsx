import { SelectOption } from '@/types';
import { FormControl, FormLabel, Option, Select } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

export default function Selector({
  options,
  loadFunc,
  loadOptions,
}: {
  options: SelectOption[];
  loadFunc?: () => void;
  loadOptions?: { label: string; value: string }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (key: string, value: string | string[] | null) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value !== null) {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          params.delete(key);
        } else {
          params.set(key, value.join(','));
        }
      } else {
        params.set(key, value);
      }
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const selectorRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const cur = selectorRef.current;
    const handleScroll = () => {
      if (cur) {
        const bottom = cur.scrollHeight - cur.scrollTop === cur.clientHeight;
        if (bottom && loadFunc) {
          loadFunc();
        }
      }
    };
    cur?.addEventListener('scroll', handleScroll);
    return () => {
      cur?.removeEventListener('scroll', handleScroll);
    };
  }, [loadFunc]);

  return (
    <>
      {options.map((option) => (
        <FormControl key={option.label} size="sm">
          <FormLabel>{option.label}</FormLabel>
          <Select
            multiple={option.multiple}
            placeholder="请选择"
            size="sm"
            slotProps={{
              button: { sx: { whiteSpace: 'nowrap' } },
              listbox: { ref: selectorRef },
            }}
            onChange={(_, value) => handleSelect(option.value, value)}
            defaultValue={
              option.multiple && searchParams.get(option.value)
                ? searchParams.get(option.value)!.split(',')
                : searchParams.get(option.value)
            }
          >
            {option.loadable
              ? loadOptions?.map((o) => (
                  <Option key={o.value} value={o.value}>
                    {o.label}
                  </Option>
                ))
              : option.options.map((o) => (
                  <Option key={o.value} value={o.value}>
                    {o.label}
                  </Option>
                ))}
            {!option.multiple && <Option value={null}>不限</Option>}
          </Select>
        </FormControl>
      ))}
    </>
  );
}
