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

export default function SignUp() {
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
          <Typography level="body-sm">Sign up for an account.</Typography>
        </Box>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" placeholder="johndoe@email.com" />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" placeholder="password" />
        </FormControl>

        <Button sx={{ mt: 1 }}>Create account</Button>
        <Typography
          endDecorator={<Link href="/login">Log in</Link>}
          fontSize="sm"
          sx={{ alignSelf: 'center' }}
        >
          Already have an account?
        </Typography>
      </Sheet>
    </Sheet>
  );
}
