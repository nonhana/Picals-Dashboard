import IllustratorCreateModal from '@/ui/illustrators/CreateModal';
import IllustratorFilter from '@/ui/illustrators/Filter';
import IllustratorMobileFilter from '@/ui/illustrators/MobileFilter';
import IllustratorTable from '@/ui/illustrators/Table';
import PageLoading from '@/ui/PageLoading';
import { Box, Button, Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography level="h2">插画家管理</Typography>
        <Button component="a" href="#upload" variant="outlined">
          新增插画家
        </Button>
      </Box>
      <Suspense fallback={<PageLoading />}>
        <IllustratorMobileFilter />
        <IllustratorFilter />
        <IllustratorTable />
      </Suspense>
      <IllustratorCreateModal />
    </>
  );
}
