import { Button, Card, Typography } from '@mui/joy';

export default function Page() {
  return (
    <Card>
      <Typography level="h3">上传作品成功！！</Typography>
      <Button
        component="a"
        href="/dashboard/works/upload"
        variant="outlined"
        color="primary"
      >
        点击返回上传页
      </Button>
    </Card>
  );
}
