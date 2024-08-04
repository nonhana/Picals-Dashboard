import LabelFilter from '@/ui/labels/Filter';
import LabelMobileFilter from '@/ui/labels/MobileFilter';
import LabelTable from '@/ui/labels/Table';
import { Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Typography level="h2">标签管理</Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <LabelMobileFilter />
        <LabelFilter />
        <LabelTable />
      </Suspense>
    </>
  );
}
