'use client';

import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { Box, Breadcrumbs, Link, Typography } from '@mui/joy';
import { usePathname } from 'next/navigation';

export default function RouteNavigator() {
  const pathname = usePathname();
  const paths = pathname
    .split('/')
    .filter(Boolean)
    .filter((path) => path !== 'dashboard');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Breadcrumbs
        size="sm"
        aria-label="breadcrumbs"
        separator={<ChevronRightRoundedIcon fontSize="small" />}
        sx={{ pl: 0 }}
      >
        <Link
          underline="none"
          color="neutral"
          href="/dashboard"
          aria-label="Home"
        >
          <HomeRoundedIcon />
        </Link>
        {paths.map((path, index) =>
          index !== paths.length - 1 ? (
            <Link
              key={path}
              underline="hover"
              color="neutral"
              href={`/${paths.slice(0, index + 1).join('/')}`}
              fontSize={12}
              fontWeight={500}
            >
              {path}
            </Link>
          ) : (
            <Typography
              key={path}
              color="primary"
              fontWeight={500}
              fontSize={12}
            >
              {path}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </Box>
  );
}
