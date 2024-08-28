import PageLoading from '@/ui/PageLoading';
import AdminFilter from '@/ui/admins/Filter';
import AdminMobileFilter from '@/ui/admins/MobileFilter';
import AdminTable from '@/ui/admins/Table';
import { Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Typography level="h2">管理员管理</Typography>
      <Suspense fallback={<PageLoading />}>
        <AdminMobileFilter />
        <AdminFilter />
        <AdminTable />
      </Suspense>
    </>
  );
}
