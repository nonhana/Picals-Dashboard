'use client';

import {
  getIllustratorCountAPI,
  getIllustratorListAPI,
} from '@/services/client/illustrator';
import { IllustratorItem } from '@/types';
import { PAGE_SIZE } from '@/utils/constants';
import { illustratorTableHeads } from '@/utils/tableHeaders';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
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
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import Pagination from '../Pagination';
import IllustratorEditModal from './EditModal';

function statusChip(type: number) {
  return (
    <Chip
      variant="soft"
      size="sm"
      startDecorator={
        {
          0: <CheckRoundedIcon />,
          1: <CloseRoundedIcon />,
        }[type]
      }
      color={
        {
          0: 'success',
          1: 'danger',
        }[type] as ColorPaletteProp
      }
    >
      {
        {
          0: '正常',
          1: '删除',
        }[type]
      }
    </Chip>
  );
}

export default function IllustratorTable() {
  const sortableHeads = illustratorTableHeads
    .filter((head) => head.sortable)
    .map((item) => item.value);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [illustratorList, setIllustratorList] = React.useState<
    IllustratorItem[]
  >([]);
  const [total, setTotal] = React.useState(0);

  const fetchIllustratorList = React.useCallback(async () => {
    const params = Object.fromEntries(searchParams.entries());
    const data = await getIllustratorListAPI(params);
    setIllustratorList(data ?? []);
  }, [searchParams]);

  const fetchIllustratorCount = React.useCallback(async () => {
    const params = Object.fromEntries(searchParams.entries());
    const data = await getIllustratorCountAPI(params);
    setTotal(data ?? 0);
  }, [searchParams]);

  React.useEffect(() => {
    fetchIllustratorList();
    fetchIllustratorCount();
  }, [fetchIllustratorList, fetchIllustratorCount]);

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

  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [targetId, setTargetId] = React.useState<string | undefined>();

  const preEdit = (id: string) => {
    setTargetId(id);
    setEditModalVisible(true);
  };

  React.useEffect(() => {
    if (!editModalVisible) {
      setTargetId(undefined);
    }
  }, [editModalVisible]);

  const refresh = async () => {
    await fetchIllustratorList();
    await fetchIllustratorCount();
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
              {illustratorTableHeads.map((head) => (
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
            {illustratorList.map((row) => (
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
                  <Typography level="body-xs">{row.name}</Typography>
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
                        {row.intro}
                      </Typography>
                    </Tooltip>
                  </Typography>
                </td>
                <td style={{ textAlign: 'center', width: 60 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    {row.little_avatar ? (
                      <Image
                        src={row.little_avatar}
                        alt={row.name}
                        width={32}
                        height={32}
                        style={{ borderRadius: '50%' }}
                      />
                    ) : (
                      <Typography level="body-xs">暂无</Typography>
                    )}
                  </Box>
                </td>
                <td style={{ textAlign: 'center', width: 150 }}>
                  <Tooltip title={row.home_url} placement="top" arrow>
                    <Typography
                      level="body-xs"
                      sx={{
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {row.home_url}
                    </Typography>
                  </Tooltip>
                </td>
                <td style={{ textAlign: 'center', width: 100 }}>
                  <Typography level="body-xs">{row.work_count}</Typography>
                </td>
                <td style={{ textAlign: 'center', width: 100 }}>
                  {statusChip(row.status)}
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
                      <MenuItem onClick={() => preEdit(row.id)}>
                        编辑信息
                      </MenuItem>
                      <MenuItem
                        component="a"
                        href={`/dashboard/works?page=1&illustrator=${row.name}`}
                      >
                        查看作品
                      </MenuItem>
                      <Divider />
                      <MenuItem color="danger">删除插画家</MenuItem>
                    </Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <IllustratorEditModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        illustratorId={targetId}
        refresh={refresh}
      />
      <Pagination total={total} pageSize={PAGE_SIZE} />
    </>
  );
}
