import { Box, Stack, Typography } from '@mui/joy';
import ColorSchemeToggle from './ColorSchemeToggle';
import OpenButtons from './OpenButtons';
import UserDropdown from './dropdown';

export default function Header() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <Typography level="title-lg">Picals Dashboard</Typography>
      </Stack>
      <OpenButtons />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <ColorSchemeToggle />
        <UserDropdown />
      </Box>
    </Box>
  );
}
