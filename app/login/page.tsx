import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Sheet,
  Typography,
} from '@mui/joy';

export default function Login() {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Sheet
        sx={{
          width: 400,
          mx: 'auto',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          borderRadius: 'md',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography level="h4" component="h1">
            <strong>Picals Dashboard</strong>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </Box>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" placeholder="johndoe@email.com" />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" placeholder="password" />
        </FormControl>
        <Button sx={{ mt: 1 }}>Log in</Button>
        <Typography
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </Sheet>
  );
}
