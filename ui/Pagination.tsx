'use client';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Box, Button, IconButton, Typography } from '@mui/joy';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

export default function Pagination({
  total,
  pageSize,
}: {
  total: number;
  pageSize: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [current, setCurrent] = React.useState(1);

  React.useEffect(() => {
    const page = Number(searchParams.get('page')) || 1;
    setCurrent(page);
  }, [searchParams]);

  const totalPages = Math.ceil(total / pageSize) || 1;

  const setSearchParams = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    replace(`${pathname}?${params.toString()}`);
  };

  const stepPage = (type: 'prev' | 'next') => {
    if (type === 'prev') {
      if (current === 1) return;
      setSearchParams(current - 1);
    } else {
      if (current === totalPages) return;
      setSearchParams(current + 1);
    }
  };

  const maxButtonCount = 7;
  const sideButtonCount = (maxButtonCount - 3) / 2;

  function PaginationButton({
    page,
    isActive,
  }: {
    page: number;
    isActive: boolean;
  }) {
    return (
      <IconButton
        key={page}
        size="sm"
        variant="outlined"
        color="neutral"
        onClick={() => setSearchParams(page)}
        sx={{ borderRadius: '50%' }}
        disabled={isActive}
      >
        {page}
      </IconButton>
    );
  }

  function renderButtons() {
    const buttons = [];
    let start = 1;
    let end = totalPages;

    if (totalPages > maxButtonCount) {
      start = Math.max(current - sideButtonCount, 2);
      end = Math.min(current + sideButtonCount, totalPages - 1);

      if (current + 1 < maxButtonCount - 1) {
        end = maxButtonCount - 1;
      }

      if (current > totalPages - maxButtonCount + 2) {
        start = totalPages - maxButtonCount + 2;
      }
    }

    if (start !== 1) {
      buttons.push(
        <PaginationButton key={1} page={1} isActive={current === 1} />
      );
    }

    if (start > 2) {
      buttons.push(<Typography key="left-ellipsis">...</Typography>);
    }

    for (let i = start; i <= end; i++) {
      buttons.push(
        <PaginationButton key={i} page={i} isActive={i === current} />
      );
    }

    if (end < totalPages - 1) {
      buttons.push(<Typography key="right-ellipsis">...</Typography>);
    }

    if (end !== totalPages && totalPages > 1) {
      buttons.push(
        <PaginationButton
          key={totalPages}
          page={totalPages}
          isActive={current === totalPages}
        />
      );
    }

    return buttons;
  }

  return (
    <Box
      sx={{
        pt: 2,
        gap: 1,
        display: 'flex',
      }}
    >
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        startDecorator={<KeyboardArrowLeftIcon />}
        onClick={() => stepPage('prev')}
      >
        前一页
      </Button>
      <Box sx={{ flex: 1 }} />
      {renderButtons()}
      <Box sx={{ flex: 1 }} />
      <Button
        size="sm"
        variant="outlined"
        color="neutral"
        endDecorator={<KeyboardArrowRightIcon />}
        onClick={() => stepPage('next')}
      >
        后一页
      </Button>
    </Box>
  );
}
