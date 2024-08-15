import UploadForm from '@/ui/works/UploadForm';
import { Typography } from '@mui/joy';
import { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <Typography level="h2">作品管理-上传作品</Typography>
      <Suspense fallback="Loading...">
        <UploadForm />
      </Suspense>
    </>
  );
}
