import ImageFilter from '@/ui/images/Filter';
import ImageMobileFilter from '@/ui/images/MobileFilter';
import ImageTable from '@/ui/images/Table';
import { Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Typography level="h2">图片管理</Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <ImageMobileFilter />
        <ImageFilter />
        <ImageTable />
      </Suspense>
    </>
  );
}
