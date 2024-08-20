import { Box, CircularProgress } from '@mui/joy';

export default function PageLoading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress />
    </Box>
  );
}
