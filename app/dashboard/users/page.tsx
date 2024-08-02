import Pagination from '@/ui/Pagination';
import UserFilter from '@/ui/users/Filter';
import UserMobileFilter from '@/ui/users/MobileFilter';
import UserTable from '@/ui/users/Table';
import { Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Typography level="h2">用户管理</Typography>
      <Suspense fallback={<>Loading...</>}>
        <UserMobileFilter />
        <UserFilter />
        <UserTable />
      </Suspense>
      <Pagination />
    </>
  );
}
