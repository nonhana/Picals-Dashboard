import CommentFilter from '@/ui/comments/Filter';
import CommentMobileFilter from '@/ui/comments/MobileFilter';
import CommentTable from '@/ui/comments/Table';
import { Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Typography level="h2">评论管理</Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <CommentMobileFilter />
        <CommentFilter />
        <CommentTable />
      </Suspense>
    </>
  );
}
