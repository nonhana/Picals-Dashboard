import { FormControl, FormLabel, Option, Select } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const selectOptions = [
  {
    label: '删除状态',
    value: 'deleted',
    options: [
      {
        label: '已删除',
        value: 'true',
      },
      {
        label: '未删除',
        value: 'false',
      },
    ],
  },
];

export default function UserSelector() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set(key, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {selectOptions.map((option) => (
        <FormControl key={option.label} size="sm">
          <FormLabel>{option.label}</FormLabel>
          <Select
            size="sm"
            placeholder="请选择"
            slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
            onChange={(_, value) => handleSelect(option.value, value as string)}
            defaultValue={searchParams.get(option.value) || ''}
          >
            {option.options.map((o) => (
              <Option key={o.value} value={o.value}>
                {o.label}
              </Option>
            ))}
          </Select>
        </FormControl>
      ))}
    </>
  );
}
