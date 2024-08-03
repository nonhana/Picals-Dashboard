import { FormControl, FormLabel, Option, Select } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const selectOptions = [
  {
    label: '插画状态',
    value: 'status',
    options: [
      {
        label: '审核中',
        value: 0,
      },
      {
        label: '已发布',
        value: 1,
      },
      {
        label: '已删除',
        value: 2,
      },
    ],
  },
  {
    label: '转载状态',
    value: 'reprintType',
    options: [
      {
        label: '原创',
        value: 0,
      },
      {
        label: '转载',
        value: 1,
      },
      {
        label: '合集',
        value: 2,
      },
    ],
  },
  {
    label: '包含标签',
    value: 'label',
    multiple: true,
    options: [
      {
        label: '插画',
        value: '插画',
      },
      {
        label: '人物',
        value: '人物',
      },
      {
        label: '风景',
        value: '风景',
      },
      {
        label: '动物',
        value: '动物',
      },
      {
        label: '科幻',
        value: '科幻',
      },
    ],
  },
];

export default function WorkSelector() {
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
      {selectOptions.map((option) => (
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
