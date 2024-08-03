import { SelectOption } from '@/types';
import { FormControl, FormLabel, Option, Select } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Selector({ options }: { options: SelectOption[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (key: string, value: string | string[] | null) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (value) {
      if (Array.isArray(value)) {
        console.log(value);
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

  return (
    <>
      {options.map((option) => (
        <FormControl key={option.label} size="sm">
          <FormLabel>{option.label}</FormLabel>
          <Select
            multiple={option.multiple}
            placeholder="请选择"
            size="sm"
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
            onChange={(_, value) => handleSelect(option.value, value)}
            defaultValue={
              option.multiple && searchParams.get(option.value)
                ? searchParams.get(option.value)!.split(',')
                : searchParams.get(option.value)
            }
          >
            {option.options.map((o) => (
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
