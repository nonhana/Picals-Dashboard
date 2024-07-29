import { Button } from '@mui/joy';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

export default function Page() {
  return (
    <Sheet>
      <Typography fontSize="large">Hello World</Typography>
      <Button>这是一个按钮</Button>
    </Sheet>
  );
}
