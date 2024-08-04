import IllustratorFilter from '@/ui/illustrators/Filter';
import IllustratorMobileFilter from '@/ui/illustrators/MobileFilter';
import IllustratorTable from '@/ui/illustrators/Table';
import { Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Typography level="h2">插画家管理</Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <IllustratorMobileFilter />
        <IllustratorFilter />
        <IllustratorTable />
      </Suspense>
    </>
  );
}
