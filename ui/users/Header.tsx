'use client';

import { Box, Button, Typography } from '@mui/joy';
import { usePathname, useRouter } from 'next/navigation';

export default function UserHeader() {
  const pathname = usePathname();
  const { replace } = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        mb: 1,
        gap: 1,
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'start', sm: 'center' },
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      <Typography level="h2" component="h1">
        用户管理
      </Typography>
      <Button
        color="primary"
        size="sm"
        onClick={() => replace(`${pathname}?page=1`)}
      >
        清空筛选项
      </Button>
    </Box>
  );
}
