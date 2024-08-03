import Pagination from '@/ui/Pagination';
import WorkFilter from '@/ui/works/Filter';
import WorkMobileFilter from '@/ui/works/MobileFilter';
import WorkTable from '@/ui/works/Table';
import { Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Typography level="h2">作品管理</Typography>
      <Suspense fallback={<>Loading...</>}>
        <WorkMobileFilter />
        <WorkFilter />
        <WorkTable />
      </Suspense>
      <Pagination />
    </>
  );
}
