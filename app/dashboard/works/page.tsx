'use client';

import ChooseCrawler from '@/ui/works/ChooseCrawler';
import WorkFilter from '@/ui/works/Filter';
import WorkMobileFilter from '@/ui/works/MobileFilter';
import WorkTable from '@/ui/works/Table';
import { Box, Button, ButtonGroup, Typography } from '@mui/joy';
import Link from 'next/link';
import { Suspense, useState } from 'react';

export default function Page() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography level="h2">作品管理</Typography>
        <ButtonGroup>
          <Button>
            <Link href="/dashboard/works/upload">手动上传作品</Link>
          </Button>
          <Button onClick={() => setVisible(true)}>爬取作品</Button>
        </ButtonGroup>
      </Box>
      <Suspense fallback={<>Loading...</>}>
        <WorkMobileFilter />
        <WorkFilter />
        <WorkTable />
      </Suspense>
      <ChooseCrawler visible={visible} setVisible={setVisible} />
    </>
  );
}
