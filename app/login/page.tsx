'use client';

import { login } from '@/services/server/actions';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Sheet,
  Snackbar,
  Typography,
} from '@mui/joy';
import * as React from 'react';

export default function Login() {
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const handleSignIn = async (formData: FormData) => {
    setIsPending(true);
    try {
      const msg = await login(formData);
      if (msg !== undefined) setErrorMessage(msg);
    } catch (error: any) {
      setErrorMessage(error.message ?? 'Something went wrong.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
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
          <Box component="form" action={handleSignIn}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="please enter your email"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="your password is:"
              />
            </FormControl>
            <Button type="submit" loading={isPending} sx={{ mt: 1 }}>
              Log in
            </Button>
          </Box>

          <Typography
            endDecorator={<Link href="/sign-up">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </Sheet>
      <Snackbar
        color="danger"
        open={errorMessage !== undefined}
        onClose={() => setErrorMessage(undefined)}
      >
        {errorMessage}
      </Snackbar>
    </>
  );
}
