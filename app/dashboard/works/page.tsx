import ChooseCrawler from '@/ui/works/ChooseCrawler';
import WorkFilter from '@/ui/works/Filter';
import WorkMobileFilter from '@/ui/works/MobileFilter';
import WorkTable from '@/ui/works/Table';
import { Box, Button, ButtonGroup, Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography level="h2">作品管理</Typography>
        <ButtonGroup>
          <Button component="a" href="/dashboard/works/upload">
            手动上传作品
          </Button>
          <Button component="a" href="#chooseCrawler">
            爬取作品
          </Button>
        </ButtonGroup>
      </Box>
      <Suspense fallback={<>Loading...</>}>
        <WorkMobileFilter />
        <WorkFilter />
        <WorkTable />
      </Suspense>
      <ChooseCrawler />
    </>
  );
}
