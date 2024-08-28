import { getUserInfo } from '@/services/server/actions';
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
import EditBtn from './EditBtn';
import LogoutBtn from './LogoutBtn';

export default async function UserDropdown() {
  const { name, email, image } = await getUserInfo();

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
          src={image ?? ''}
          sx={{ maxWidth: '32px', maxHeight: '32px' }}
        />
      </MenuButton>
      <Menu
        keepMounted
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
            <Avatar src={image ?? ''} sx={{ borderRadius: '50%' }} />
            <Box sx={{ ml: 1.5 }}>
              <Typography level="title-sm" textColor="text.primary">
                {name}
              </Typography>
              <Typography level="body-xs" textColor="text.tertiary">
                {email}
              </Typography>
            </Box>
          </Box>
        </MenuItem>
        <ListDivider />
        <EditBtn refresh={getUserInfo} />
        <ListDivider />
        <LogoutBtn />
      </Menu>
    </Dropdown>
  );
}
