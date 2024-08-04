'use client';

import { CollectionTableData } from '@/test/data';
import { collectionTableHeads } from '@/utils/tableHeaders';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {
  Box,
  Divider,
  Dropdown,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Table,
  Tooltip,
  Typography,
} from '@mui/joy';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Pagination from '../Pagination';

export default function CollectionTable() {
  const sortableHeads = collectionTableHeads
    .filter((head) => head.sortable)
    .map((item) => item.value);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSort = (field: string) => {
    const params = new URLSearchParams(searchParams);
    sortableHeads.forEach((head) => {
      if (head !== field) params.delete(head);
    });
    const order = params.get(field);
    if (order === 'desc') {
      params.set(field, 'asc');
    } else if (order === 'asc') {
      params.delete(field);
    } else {
      params.set(field, 'desc');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <Box
        sx={{
          position: { xs: 'absolute', sm: 'relative' },
          width: '100%',
          maxHeight: 'calc(100vh - 310px)',
          overflow: 'auto',
        }}
      >
        <Table
          aria-labelledby="illustratorTable"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground':
              'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '.0625rem',
            '--TableRow-hoverBackground':
              'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '.25rem',
            '--TableCell-paddingX': '.5rem',
          }}
        >
          <thead>
            <tr>
              {collectionTableHeads.map((head) => (
                <th
                  key={head.value}
                  style={{
                    padding: '.75rem .375rem',
                    width: head.width ?? '',
                    textAlign: 'center',
                  }}
                >
                  {head.sortable ? (
                    <Link
                      underline="none"
                      color="primary"
                      component="button"
                      onClick={() => handleSort(head.value)}
                      endDecorator={
                        searchParams.get(head.value) ? (
                          <ArrowDropDownIcon />
                        ) : null
                      }
                      sx={[
                        {
                          fontWeight: 'lg',
                          '& svg': {
                            transition: '0.2s',
                            transform:
                              searchParams.get(head.value) === 'desc'
                                ? 'rotate(0deg)'
                                : 'rotate(180deg)',
                          },
                        },
                        searchParams.get(head.value) === 'desc'
                          ? { '& svg': { transform: 'rotate(0deg)' } }
                          : { '& svg': { transform: 'rotate(180deg)' } },
                      ]}
                    >
                      {head.name}
                    </Link>
                  ) : (
                    head.name
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CollectionTableData.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 100 }}>
                  <Typography level="body-xs">{row.id}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Typography level="body-xs">{row.name}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 150 }}>
                  <Typography level="body-xs">
                    <Tooltip title={row.introduce} placement="top" arrow>
                      <Typography
                        level="body-xs"
                        sx={{
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.introduce}
                      </Typography>
                    </Tooltip>
                  </Typography>
                </td>
                <td style={{ textAlign: 'center', width: 60 }}>
                  {row.cover ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Image
                        src={row.cover}
                        alt="cover"
                        width={32}
                        height={32}
                      />
                    </Box>
                  ) : (
                    <Typography level="body-xs">暂无</Typography>
                  )}
                </td>
                <td style={{ textAlign: 'center', width: 60 }}>
                  <Typography level="body-xs">{row.order}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 100 }}>
                  <Typography level="body-xs">{row.work_count}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Typography level="body-xs">{row.created_at}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Typography level="body-xs">{row.user_name}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 60 }}>
                  <Dropdown>
                    <MenuButton
                      slots={{ root: IconButton }}
                      slotProps={{
                        root: {
                          variant: 'plain',
                          color: 'neutral',
                          size: 'sm',
                        },
                      }}
                    >
                      <MoreHorizRoundedIcon />
                    </MenuButton>
                    <Menu size="sm" sx={{ minWidth: 140 }}>
                      <MenuItem>编辑信息</MenuItem>
                      <Divider />
                      <MenuItem color="danger">删除收藏集</MenuItem>
                    </Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <Pagination total={1000} pageSize={30} />
    </>
  );
}
