import { signOut } from '@/auth';
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
        <Avatar src={avatar} sx={{ maxWidth: '32px', maxHeight: '32px' }} />
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
            <Avatar src="" sx={{ borderRadius: '50%' }} />
            <Box sx={{ ml: 1.5 }}>
              <Typography level="title-sm" textColor="text.primary">
                {username}
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                {email}
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

        <MenuItem>
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button>
              <LogoutRoundedIcon />
              退出登录
            </button>
          </form>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
