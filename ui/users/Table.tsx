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
  Sheet,
  Table,
  Typography,
} from '@mui/joy';
import { ColorPaletteProp } from '@mui/joy/styles';
import * as React from 'react';

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
    <Sheet
      variant="outlined"
      sx={{
        display: { xs: 'none', sm: 'initial' },
        width: '100%',
        borderRadius: 'sm',
        flexShrink: 1,
        overflow: 'auto',
        minHeight: 0,
      }}
    >
      <Table
        aria-labelledby="tableTitle"
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
                  selected.length > 0 &&
                  selected.length !== userTableData.length
                }
                checked={selected.length === userTableData.length}
                onChange={(event) => {
                  setSelected(
                    event.target.checked
                      ? userTableData.map((row) => row.id)
                      : []
                  );
                }}
                color={
                  selected.length > 0 ||
                  selected.length === userTableData.length
                    ? 'primary'
                    : undefined
                }
                sx={{ verticalAlign: 'text-bottom' }}
              />
            </th>
            <th style={{ width: 120, padding: '12px 6px' }}>
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
                Invoice
              </Link>
            </th>
            <th style={{ width: 140, padding: '12px 6px' }}>Date</th>
            <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
            <th style={{ width: 240, padding: '12px 6px' }}>Customer</th>
            <th style={{ width: 140, padding: '12px 6px' }}> </th>
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
                    <Typography level="body-xs">
                      {row.customer.email}
                    </Typography>
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
    </Sheet>
  );
}
