'use client';

import { getUserCountAPI, getUserListAPI } from '@/services/client/user';
import type { UserItem } from '@/types';
import { PAGE_SIZE } from '@/utils/constants';
import { userTableHeads } from '@/utils/tableHeaders';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
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
import UserEditModal from './EditModal';

type TargetUser = {
  id: string;
  username: string;
};

export default function UserTable() {
  const sortableHeads = userTableHeads
    .filter((head) => head.sortable)
    .map((item) => item.value);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [userList, setUserList] = React.useState<UserItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);

  const fetchUserList = React.useCallback(async () => {
    setFetching(true);
    const params = Object.fromEntries(searchParams.entries());
    const data = await getUserListAPI(params);
    setUserList(data ?? []);
    setFetching(false);
  }, [searchParams]);

  const fetchUserCount = React.useCallback(async () => {
    const params = Object.fromEntries(searchParams.entries());
    const data = await getUserCountAPI(params);
    setTotal(data ?? 0);
  }, [searchParams]);

  React.useEffect(() => {
    fetchUserList();
    fetchUserCount();
  }, [fetchUserList, fetchUserCount]);

  const refresh = async () => {
    await fetchUserList();
    await fetchUserCount();
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
  const [targetUser, setTargetUser] = React.useState<TargetUser>();

  const preEditUser = (target: TargetUser) => {
    setTargetUser(target);
    setEditModalVisible(true);
  };

  React.useEffect(() => {
    if (!editModalVisible) {
      setTargetUser(undefined);
    }
  }, [editModalVisible]);

  const preDelUser = (target: TargetUser) => {
    setTargetUser(target);
    setDelModalVisible(true);
  };

  React.useEffect(() => {
    if (!delModalVisible) {
      setTargetUser(undefined);
    }
  }, [delModalVisible]);

  const handleDelUser = () => {
    console.log(targetUser?.id);
    setDelModalVisible(false);
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
          aria-labelledby="userTable"
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
              {userTableHeads.map((head) => (
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
              userList.map((row) => (
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
                    <Typography level="body-xs">{row.username}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 150 }}>
                    <Typography level="body-xs">{row.email}</Typography>
                  </td>
                  <td style={{ width: 60 }}>
                    <Image
                      src={row.avatar}
                      alt={row.username}
                      width={60}
                      height={60}
                      style={{ objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </td>
                  <td
                    style={{
                      width: 120,
                      textAlign: 'center',
                    }}
                  >
                    {row.background_img ? (
                      <Image
                        src={row.background_img}
                        alt={row.username}
                        width={120}
                        height={60}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <Typography level="body-xs">暂无背景图</Typography>
                    )}
                  </td>
                  <td style={{ textAlign: 'center', width: 150 }}>
                    <Typography level="body-xs">{row.signature}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 60 }}>
                    <Typography level="body-xs">
                      {row.gender === 1 ? '女' : '男'}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Typography level="body-xs">{row.fan_count}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Typography level="body-xs">{row.follow_count}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 120 }}>
                    <Typography level="body-xs">{row.origin_count}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 120 }}>
                    <Typography level="body-xs">
                      {row.reprinted_count}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          0: <CheckRoundedIcon />,
                          1: <ClearRoundedIcon />,
                        }[row.status]
                      }
                      color={
                        {
                          0: 'success',
                          1: 'danger',
                        }[row.status] as ColorPaletteProp
                      }
                    >
                      {row.status === 0 ? '正常' : '删除'}
                    </Chip>
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
                        <MenuItem
                          onClick={() =>
                            preEditUser({ id: row.id, username: row.username })
                          }
                        >
                          编辑用户
                        </MenuItem>
                        <Divider />
                        <MenuItem
                          color="danger"
                          onClick={() =>
                            preDelUser({ id: row.id, username: row.username })
                          }
                        >
                          删除用户
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
        handle={handleDelUser}
        message={`确定删除用户 ${targetUser?.username} 吗？`}
      />
      <UserEditModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        userId={targetUser?.id}
        refresh={refresh}
      />
      <Pagination total={total} pageSize={PAGE_SIZE} />
    </>
  );
}
