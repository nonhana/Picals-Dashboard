import Pagination from '@/ui/Pagination';
import WorkFilter from '@/ui/works/Filter';
import WorkMobileFilter from '@/ui/works/MobileFilter';
import WorkTable from '@/ui/works/Table';
import { Box, Button, ButtonGroup, Typography } from '@mui/joy';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography level="h2">作品管理</Typography>
        <ButtonGroup>
          <Button>
            <Link href="/dashboard/works/upload">手动上传作品</Link>
          </Button>
          <Button>
            <Link href="/dashboard/works/crawler">爬取作品</Link>
          </Button>
        </ButtonGroup>
      </Box>
      <Suspense fallback={<>Loading...</>}>
        <WorkMobileFilter />
        <WorkFilter />
        <WorkTable />
      </Suspense>
      <Pagination />
    </>
  );
}
