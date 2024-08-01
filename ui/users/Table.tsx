'use client';

import { userTableData } from '@/test/data';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import BlockIcon from '@mui/icons-material/Block';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  Dropdown,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Table,
  Typography,
} from '@mui/joy';
import { ColorPaletteProp } from '@mui/joy/styles';
import * as React from 'react';

const userTableHeads: { name: string; value: string; sortable: boolean }[] = [
  {
    name: '用户id',
    value: 'id',
    sortable: false,
  },
  {
    name: '用户名',
    value: 'username',
    sortable: false,
  },
  {
    name: '邮箱',
    value: 'email',
    sortable: false,
  },
  {
    name: '头像',
    value: 'avatar',
    sortable: false,
  },
  {
    name: '背景图片',
    value: 'background_img',
    sortable: false,
  },
  {
    name: '个性签名',
    value: 'signature',
    sortable: false,
  },
  {
    name: '性别',
    value: 'gender',
    sortable: false,
  },
  {
    name: '粉丝数',
    value: 'fan_count',
    sortable: true,
  },
  {
    name: '关注数',
    value: 'follow_count',
    sortable: true,
  },
  {
    name: '原创作品数',
    value: 'original_count',
    sortable: true,
  },
  {
    name: '转载作品数',
    value: 'reprinted_count',
    sortable: true,
  },
  {
    name: '状态',
    value: 'status',
    sortable: false,
  },
  {
    name: '注册时间',
    value: 'created_time',
    sortable: true,
  },
  {
    name: '操作',
    value: 'action',
    sortable: false,
  },
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function UserTable() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);

  return (
    <Table
      aria-labelledby="userTable"
      stickyHeader
      hoverRow
      sx={{
        '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
        '--Table-headerUnderlineThickness': '1px',
        '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
        '--TableCell-paddingY': '4px',
        '--TableCell-paddingX': '8px',
      }}
    >
      <thead>
        <tr>
          <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
            <Checkbox
              size="sm"
              indeterminate={
                selected.length > 0 && selected.length !== userTableData.length
              }
              checked={selected.length === userTableData.length}
              onChange={(event) => {
                setSelected(
                  event.target.checked ? userTableData.map((row) => row.id) : []
                );
              }}
              color={
                selected.length > 0 || selected.length === userTableData.length
                  ? 'primary'
                  : undefined
              }
              sx={{ verticalAlign: 'text-bottom' }}
            />
          </th>
          {userTableHeads.map((head) => (
            <th key={head.value} style={{ padding: '12px 6px' }}>
              {head.sortable ? (
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  endDecorator={<ArrowDropDownIcon />}
                  sx={[
                    {
                      fontWeight: 'lg',
                      '& svg': {
                        transition: '0.2s',
                        transform:
                          order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                      },
                    },
                    order === 'desc'
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
        {[...userTableData].sort(getComparator(order, 'id')).map((row) => (
          <tr key={row.id}>
            <td style={{ textAlign: 'center', width: 120 }}>
              <Checkbox
                size="sm"
                checked={selected.includes(row.id)}
                color={selected.includes(row.id) ? 'primary' : undefined}
                onChange={(event) => {
                  setSelected((ids) =>
                    event.target.checked
                      ? ids.concat(row.id)
                      : ids.filter((itemId) => itemId !== row.id)
                  );
                }}
                slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                sx={{ verticalAlign: 'text-bottom' }}
              />
            </td>
            <td>
              <Typography level="body-xs">{row.id}</Typography>
            </td>
            <td>
              <Typography level="body-xs">{row.date}</Typography>
            </td>
            <td>
              <Chip
                variant="soft"
                size="sm"
                startDecorator={
                  {
                    Paid: <CheckRoundedIcon />,
                    Refunded: <AutorenewRoundedIcon />,
                    Cancelled: <BlockIcon />,
                  }[row.status]
                }
                color={
                  {
                    Paid: 'success',
                    Refunded: 'neutral',
                    Cancelled: 'danger',
                  }[row.status] as ColorPaletteProp
                }
              >
                {row.status}
              </Chip>
            </td>
            <td>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar size="sm">{row.customer.initial}</Avatar>
                <div>
                  <Typography level="body-xs">{row.customer.name}</Typography>
                  <Typography level="body-xs">{row.customer.email}</Typography>
                </div>
              </Box>
            </td>
            <td>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Link level="body-xs" component="button">
                  Download
                </Link>
                <RowMenu />
              </Box>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
