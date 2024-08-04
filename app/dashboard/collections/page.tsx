import CollectionFilter from '@/ui/collections/Filter';
import CollectionMobileFilter from '@/ui/collections/MobileFilter';
import CollectionTable from '@/ui/collections/Table';
import { Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Typography level="h2">收藏集管理</Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <CollectionMobileFilter />
        <CollectionFilter />
        <CollectionTable />
      </Suspense>
    </>
  );
}
