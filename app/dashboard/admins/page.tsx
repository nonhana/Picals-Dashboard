import PageLoading from '@/ui/PageLoading';
import AdminFilter from '@/ui/admins/Filter';
import AdminMobileFilter from '@/ui/admins/MobileFilter';
import AdminTable from '@/ui/admins/Table';
import { Box, Button, Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography level="h2">管理员管理</Typography>
        <Button component="a" href="/register" variant="outlined">
          新增管理员
        </Button>
      </Box>
      <Suspense fallback={<PageLoading />}>
        <AdminMobileFilter />
        <AdminFilter />
        <AdminTable />
      </Suspense>
    </>
  );
}
