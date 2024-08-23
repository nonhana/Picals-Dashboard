'use client';

import {
  deleteImageAPI,
  getImageCountAPI,
  getImageListAPI,
} from '@/services/client/image';
import { ImageItem } from '@/types';
import { PAGE_SIZE } from '@/utils/constants';
import { imageTableHeads } from '@/utils/tableHeaders';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import {
  Box,
  CircularProgress,
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
import PreviewModal from '../PreviewModal';
import toast from '../Toast';

export default function ImageTable() {
  const sortableHeads = imageTableHeads
    .filter((head) => head.sortable)
    .map((item) => item.value);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [imageList, setImageList] = React.useState<ImageItem[]>([]);
  const [total, setTotal] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);

  const fetchImageList = React.useCallback(async () => {
    setFetching(true);
    const params = Object.fromEntries(searchParams.entries());
    const data = await getImageListAPI(params);
    setImageList(data ?? []);
    setFetching(false);
  }, [searchParams]);

  const fetchImageCount = React.useCallback(async () => {
    const params = Object.fromEntries(searchParams.entries());
    const data = await getImageCountAPI(params);
    setTotal(data ?? 0);
  }, [searchParams]);

  React.useEffect(() => {
    fetchImageList();
    fetchImageCount();
  }, [fetchImageList, fetchImageCount]);

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

  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewSrc, setPreviewSrc] = React.useState('');

  const handlePreview = (src: string) => {
    setPreviewSrc(src);
    setPreviewVisible(true);
  };

  const refresh = async () => {
    await fetchImageList();
    await fetchImageCount();
  };

  const [delModalVisible, setDelModalVisible] = React.useState(false);
  const [targetId, setTargetId] = React.useState<string | undefined>();

  const preDel = (id: string) => {
    setTargetId(id);
    setDelModalVisible(true);
  };

  const handleDel = async () => {
    if (targetId) {
      const data = await deleteImageAPI({ image_id: targetId });
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
          aria-labelledby="imageTable"
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
              {imageTableHeads.map((head) => (
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
              imageList.map((row) => (
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
                  <td style={{ textAlign: 'center', width: 150 }}>
                    <Typography level="body-xs">
                      <Tooltip title={row.originUrl} placement="top" arrow>
                        <Typography
                          level="body-xs"
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {row.originUrl}
                        </Typography>
                      </Tooltip>
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Typography level="body-xs">{row.originWidth}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Typography level="body-xs">{row.originHeight}</Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Typography level="body-xs">{row.originSize}kb</Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 150 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 60,
                        height: 60,
                        overflow: 'hidden',
                        margin: '0 auto',
                      }}
                    >
                      <Image
                        src={row.thumbnailUrl}
                        alt={row.thumbnailUrl}
                        width={60}
                        height={60}
                        style={{ objectFit: 'cover' }}
                      />
                    </Box>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Typography level="body-xs">
                      {row.thumbnailWidth}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Typography level="body-xs">
                      {row.thumbnailHeight}
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Typography level="body-xs">
                      {row.thumbnailSize}kb
                    </Typography>
                  </td>
                  <td style={{ textAlign: 'center', width: 100 }}>
                    <Typography level="body-xs">
                      <Tooltip
                        title={row.illustration_id}
                        placement="top"
                        arrow
                      >
                        <Typography
                          level="body-xs"
                          sx={{
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {row.illustration_id}
                        </Typography>
                      </Tooltip>
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
                        <MenuItem onClick={() => handlePreview(row.originUrl)}>
                          查看原图
                        </MenuItem>
                        <Divider />
                        <MenuItem color="danger" onClick={() => preDel(row.id)}>
                          删除图片
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
      <Pagination total={total} pageSize={PAGE_SIZE} />
      <PreviewModal
        visible={previewVisible}
        setVisible={setPreviewVisible}
        src={previewSrc}
      />
      <ConfirmModal
        visible={delModalVisible}
        setVisible={setDelModalVisible}
        handle={handleDel}
        message="确定删除该图片吗？只有确定不需要的图片才能删除哦！！"
      />
    </>
  );
}
