import LabelCreateModal from '@/ui/labels/CreateModal';
import LabelFilter from '@/ui/labels/Filter';
import LabelMobileFilter from '@/ui/labels/MobileFilter';
import LabelTable from '@/ui/labels/Table';
import PageLoading from '@/ui/PageLoading';
import { Box, Button, Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography level="h2">插画家管理</Typography>
        <Button component="a" href="#upload" variant="outlined">
          新增标签
        </Button>
      </Box>
      <Suspense fallback={<PageLoading />}>
        <LabelMobileFilter />
        <LabelFilter />
        <LabelTable />
      </Suspense>
      <LabelCreateModal />
    </>
  );
}
