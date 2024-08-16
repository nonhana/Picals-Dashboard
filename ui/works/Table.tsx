'use client';

import { getWorkCountAPI, getWorkListAPI } from '@/services/client/work';
import { IllustrationItem } from '@/types';
import { PAGE_SIZE } from '@/utils/constants';
import { workTableHeads } from '@/utils/tableHeaders';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import TripOriginRoundedIcon from '@mui/icons-material/TripOriginRounded';
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
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import Pagination from '../Pagination';
import WorkDisplayModal from './DisplayModal';

function reprintedTypeChip(type: number) {
  return (
    <Chip
      variant="soft"
      size="sm"
      startDecorator={
        {
          0: <TripOriginRoundedIcon />,
          1: <BookmarkAddedRoundedIcon />,
          2: <BookmarksRoundedIcon />,
        }[type]
      }
      color={
        {
          0: 'success',
          1: 'warning',
          2: 'neutral',
        }[type] as ColorPaletteProp
      }
    >
      {
        {
          0: '原创',
          1: '转载',
          2: '合集',
        }[type]
      }
    </Chip>
  );
}

function statusChip(type: number) {
  return (
    <Chip
      variant="soft"
      size="sm"
      startDecorator={
        {
          0: <CheckRoundedIcon />,
          1: <IndeterminateCheckBoxRoundedIcon />,
          2: <CloseRoundedIcon />,
        }[type]
      }
      color={
        {
          0: 'success',
          1: 'neutral',
          2: 'danger',
        }[type] as ColorPaletteProp
      }
    >
      {
        {
          0: '已发布',
          1: '审核中',
          2: '已删除',
        }[type]
      }
    </Chip>
  );
}

export default function WorkTable() {
  const sortableHeads = workTableHeads
    .filter((head) => head.sortable)
    .map((item) => item.value);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [workList, setWorkList] = React.useState<IllustrationItem[]>([]);
  const [total, setTotal] = React.useState(0);

  const fetchWorkList = React.useCallback(async () => {
    const params = Object.fromEntries(searchParams.entries());
    const data = await getWorkListAPI(params);
    setWorkList(data ?? []);
  }, [searchParams]);

  const fetchWorkCount = React.useCallback(async () => {
    const params = Object.fromEntries(searchParams.entries());
    const data = await getWorkCountAPI(params);
    setTotal(data ?? 0);
  }, [searchParams]);

  React.useEffect(() => {
    fetchWorkList();
    fetchWorkCount();
  }, [fetchWorkList, fetchWorkCount]);

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

  const [visible, setVisible] = React.useState(false);
  const [chosenWorkId, setChosenWorkId] = React.useState<string | undefined>();

  const handlePreview = (id: string) => {
    setChosenWorkId(id);
    setVisible(true);
  };

  return (
    <>
      <Box
        sx={{
          position: { xs: 'absolute', sm: 'relative' },
          width: '100%',
          height: 'calc(100vh - 310px)',
          overflow: 'auto',
        }}
      >
        <Table
          aria-labelledby="workTable"
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
              {workTableHeads.map((head) => (
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
            {workList.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 100 }}>
                  <Typography level="body-xs">
                    <Tooltip title={row.id} placement="top" arrow>
                      <Typography
                        level="body-xs"
                        sx={{
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.id}
                      </Typography>
                    </Tooltip>
                  </Typography>
                </td>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Typography level="body-xs">{row.name || '无题'}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 150 }}>
                  <Typography level="body-xs">
                    <Tooltip title={row.intro} placement="top" arrow>
                      <Typography
                        level="body-xs"
                        sx={{
                          display: 'block',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.intro || '暂无简介'}
                      </Typography>
                    </Tooltip>
                  </Typography>
                </td>
                <td style={{ textAlign: 'center', width: 100 }}>
                  {reprintedTypeChip(row.reprintType)}
                </td>
                <td style={{ textAlign: 'center', width: 60 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      src={row.cover}
                      alt={row.name}
                      width={60}
                      height={60}
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                </td>
                <td style={{ textAlign: 'center', width: 100 }}>
                  <Typography level="body-xs">{row.like_count}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 100 }}>
                  <Typography level="body-xs">{row.view_count}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 100 }}>
                  <Typography level="body-xs">{row.collect_count}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Typography level="body-xs">{row.comment_count}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 150 }}>
                  <Tooltip title={row.original_url} placement="top" arrow>
                    <Typography
                      level="body-xs"
                      sx={{
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.original_url}
                    </Typography>
                  </Tooltip>
                </td>
                <td style={{ textAlign: 'center', width: 100 }}>
                  {statusChip(row.status)}
                </td>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Typography level="body-xs">{row.user_name}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Typography level="body-xs">
                    {row.illustrator_name}
                  </Typography>
                </td>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Typography level="body-xs">{row.created_time}</Typography>
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
                      <MenuItem onClick={() => handlePreview(row.id)}>
                        查看完整信息
                      </MenuItem>
                      <Divider />
                      <MenuItem color="danger">删除作品</MenuItem>
                    </Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <Pagination total={total} pageSize={PAGE_SIZE} />
      <WorkDisplayModal
        visible={visible}
        workId={chosenWorkId}
        setVisible={setVisible}
      />
    </>
  );
}
