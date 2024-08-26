'use client';

import { register } from '@/services/server/actions';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Sheet,
  Snackbar,
  Stack,
  Typography,
} from '@mui/joy';
import * as React from 'react';

export default function SignUp() {
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const handleRegister = async (formData: FormData) => {
    setIsPending(true);
    try {
      const msg = await register(formData);
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
            <Typography level="body-sm">Sign up for an account.</Typography>
          </Box>

          <Stack gap={2} component="form" action={handleRegister}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="Please enter your email address."
              />
            </FormControl>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                type="username"
                placeholder="What is your username?"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                placeholder="Your password!"
              />
            </FormControl>

            <Button type="submit" loading={isPending} sx={{ mt: 1 }}>
              Create account
            </Button>
          </Stack>

          <Typography
            endDecorator={<Link href="/login">Log in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Already have an account?
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
