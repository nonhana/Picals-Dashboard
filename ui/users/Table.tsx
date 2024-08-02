'use client';

import { userTableData } from '@/test/data';
import { userTableHeads } from '@/utils/tableHeaders';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import {
  Box,
  Button,
  Chip,
  ColorPaletteProp,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Dropdown,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalDialog,
  Table,
  Typography,
} from '@mui/joy';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

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
    setEditModalVisible(true);
    setTargetUser(target);
  };

  const preDelUser = (target: TargetUser) => {
    setDelModalVisible(true);
    setTargetUser(target);
  };

  React.useEffect(() => {
    if (!delModalVisible) setTargetUser(undefined);
    if (!editModalVisible) setTargetUser(undefined);
  }, [delModalVisible, editModalVisible]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
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
            {userTableData.map((row) => (
              <tr key={row.id}>
                <td style={{ textAlign: 'center', width: 100 }}>
                  <Typography level="body-xs">{row.id}</Typography>
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
                  />
                </td>
                <td
                  style={{
                    width: 120,
                  }}
                >
                  <Image
                    src={row.background_img || 'https://dummyimage.com/120x60'}
                    alt={row.username}
                    width={120}
                    height={60}
                  />
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
                  <Typography level="body-xs">{row.reprinted_count}</Typography>
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
                  <Typography level="body-xs">
                    {row.created_time.toLocaleDateString()}
                  </Typography>
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
            ))}
          </tbody>
        </Table>
      </Box>
      <Modal open={delModalVisible} onClose={() => setDelModalVisible(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            注意
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography level="body-md">
              确定要删除用户 <strong>{targetUser?.username}</strong> 吗？
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => setDelModalVisible(false)}
            >
              删除
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setDelModalVisible(false)}
            >
              取消
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
      <Modal open={editModalVisible} onClose={() => setEditModalVisible(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <EditRoundedIcon />
            编辑用户
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Typography level="body-md">
              这是用户 <strong>{targetUser?.username}</strong> 的编辑表单。
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="solid" onClick={() => setEditModalVisible(false)}>
              确定
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setEditModalVisible(false)}
            >
              取消
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}
