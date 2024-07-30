import Sidebar from '@/ui/Sidebar';
import { Box, Sheet } from '@mui/joy';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sheet>
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          minHeight: '100vh',
        }}
      >
        <Sidebar />
        {children}
      </Box>
    </Sheet>
  );
}
