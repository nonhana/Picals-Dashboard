'use client';

import { signOut } from '@/auth';
import { useUserStore } from '@/store/provider/user-provider';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import {
  Avatar,
  Box,
  Dropdown,
  ListDivider,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from '@mui/joy';

export default function UserDropdown() {
  const userInfo = useUserStore((state) => state.userInfo);
  const handleSignout = async () => {
    'use server';
    await signOut();
  };

  return (
    <Dropdown>
      <MenuButton
        variant="plain"
        size="sm"
        sx={{
          maxWidth: '32px',
          maxHeight: '32px',
          borderRadius: '9999999px',
        }}
      >
        <Avatar
          src={userInfo.avatar}
          sx={{ maxWidth: '32px', maxHeight: '32px' }}
        />
      </MenuButton>
      <Menu
        placement="bottom-end"
        size="sm"
        sx={{
          zIndex: '99999',
          p: 1,
          gap: 1,
          '--ListItem-radius': 'var(--joy-radius-sm)',
        }}
      >
        <MenuItem>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar src={userInfo.avatar} sx={{ borderRadius: '50%' }} />
            <Box sx={{ ml: 1.5 }}>
              <Typography level="title-sm" textColor="text.primary">
                {userInfo.name}
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                {userInfo.email}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <ListDivider />
        <MenuItem>
          <SettingsRoundedIcon />
          设置
        </MenuItem>
        <ListDivider />
        <MenuItem onClick={handleSignout}>
          <LogoutRoundedIcon />
          退出登录
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
