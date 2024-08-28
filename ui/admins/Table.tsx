'use client';

import {
  deleteAdminAPI,
  getAdminCountAPI,
  getAdminListAPI,
} from '@/services/client/admin';
import type { AdminItem } from '@/types';
import { PAGE_SIZE } from '@/utils/constants';
import { adminTableHeads } from '@/utils/tableHeaders';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {
  Box,
  Chip,
  CircularProgress,
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
import ConfirmModal from '../ConfirmModal';
import Pagination from '../Pagination';
import toast from '../Toast';
import AdminEditModal from './EditModal';

function statusChip(type: number) {
  return (
    <Chip
      variant="soft"
      size="sm"
      startDecorator={
        {
          0: <CheckRoundedIcon />,
          1: <BlockRoundedIcon />,
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
          0: '管理员',
          1: '游客',
        }[type]
      }
    </Chip>
  );
}

export default function AdminTable() {
  const sortableHeads = adminTableHeads
    .filter((head) => head.sortable)
    .map((item) => item.value);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [adminList, setAdminList] = React.useState<AdminItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);

  const fetchAdminList = React.useCallback(async () => {
    setFetching(true);
    const params = Object.fromEntries(searchParams.entries());
    const data = await getAdminListAPI(params);
    setAdminList(data ?? []);
    setFetching(false);
  }, [searchParams]);

  const fetchAdminCount = React.useCallback(async () => {
    const params = Object.fromEntries(searchParams.entries());
    const data = await getAdminCountAPI(params);
    setTotal(data ?? 0);
  }, [searchParams]);

  React.useEffect(() => {
    fetchAdminList();
    fetchAdminCount();
  }, [fetchAdminList, fetchAdminCount]);

  const refresh = async () => {
    await fetchAdminList();
    await fetchAdminCount();
  };

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

  const [delModalVisible, setDelModalVisible] = React.useState(false);
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const [targetId, setTargetId] = React.useState<string | undefined>();

  const preEditAdmin = (id: string) => {
    setTargetId(id);
    setEditModalVisible(true);
  };

  React.useEffect(() => {
    if (!editModalVisible) {
      setTargetId(undefined);
    }
  }, [editModalVisible]);

  const preDelAdmin = (id: string) => {
    setTargetId(id);
    setDelModalVisible(true);
  };

  React.useEffect(() => {
    if (!delModalVisible) {
      setTargetId(undefined);
    }
  }, [delModalVisible]);

  const handleDelAdmin = async () => {
    if (targetId) {
      const data = await deleteAdminAPI({ admin_id: targetId });
      if (data === 'success') {
        toast.success('删除成功');
        setDelModalVisible(false);
        refresh();
      }
    }
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
          aria-labelledby="adminTable"
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
              {adminTableHeads.map((head) => (
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
            {!fetching ? (
              adminList.map((row) => (
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
                    <Typography level="body-xs">{row.email}</Typography>
                  </td>
                  <td style={{ width: 60 }}>
                    {row.image ? (
                      <Image
                        src={row.image}
                        alt={row.name}
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover', borderRadius: '50%' }}
                      />
                    ) : (
                      <Typography level="body-xs">暂无头像</Typography>
                    )}
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    {statusChip(row.status)}
                  </td>
                  <td style={{ textAlign: 'center', width: 120 }}>
                    <Typography level="body-xs">{row.created_at}</Typography>
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
                        <MenuItem onClick={() => preEditAdmin(row.id)}>
                          编辑管理员
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          color="danger"
                          onClick={() => preDelAdmin(row.id)}
                        >
                          删除管理员
                        </MenuItem>
                      </Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))
            ) : (
              <CircularProgress />
            )}
          </tbody>
        </Table>
      </Box>
      <ConfirmModal
        visible={delModalVisible}
        setVisible={setDelModalVisible}
        handle={handleDelAdmin}
        message="确定删除该管理员账户吗？"
      />
      <AdminEditModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        adminId={targetId}
        refresh={refresh}
      />
      <Pagination total={total} pageSize={PAGE_SIZE} />
    </>
  );
}
