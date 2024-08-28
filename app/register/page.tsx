'use client';

import { register } from '@/services/server/actions';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
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
      if (msg !== undefined) {
        setErrorMessage(msg);
      } else {
        history.back();
      }
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
          <IconButton
            onClick={() => history.back()}
            sx={{ position: 'absolute' }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>

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
            <Typography level="body-sm">Sign up as an admin.</Typography>
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
                name="name"
                type="name"
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
