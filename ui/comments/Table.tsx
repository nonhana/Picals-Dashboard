'use client';

import { CommentTableData } from '@/test/data';
import { commentTableHeads } from '@/utils/tableHeaders';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {
  Box,
  Chip,
  ColorPaletteProp,
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
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function levelChip(type: number) {
  return (
    <Chip
      variant="soft"
      size="sm"
      color={
        {
          0: 'success',
          1: 'danger',
        }[type] as ColorPaletteProp
      }
    >
      {
        {
          0: '一级评论',
          1: '二级评论',
        }[type]
      }
    </Chip>
  );
}

export default function CommentTable() {
  const sortableHeads = commentTableHeads
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
          '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
          '--Table-headerUnderlineThickness': '.0625rem',
          '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
          '--TableCell-paddingY': '.25rem',
          '--TableCell-paddingX': '.5rem',
        }}
      >
        <thead>
          <tr>
            {commentTableHeads.map((head) => (
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
          {CommentTableData.map((row) => (
            <tr key={row.id}>
              <td style={{ textAlign: 'center', width: 100 }}>
                <Typography level="body-xs">{row.id}</Typography>
              </td>
              <td style={{ textAlign: 'center', width: 150 }}>
                <Typography level="body-xs">
                  <Tooltip title={row.content} placement="top" arrow>
                    <Typography
                      level="body-xs"
                      sx={{
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.content}
                    </Typography>
                  </Tooltip>
                </Typography>
              </td>
              <td style={{ textAlign: 'center', width: 100 }}>
                {levelChip(row.level)}
              </td>
              <td style={{ textAlign: 'center', width: 120 }}>
                <Typography level="body-xs">{row.user_name}</Typography>
              </td>
              <td style={{ textAlign: 'center', width: 120 }}>
                <Typography level="body-xs">{row.createTime}</Typography>
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
                    <MenuItem color="danger">删除评论</MenuItem>
                  </Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  );
}
