import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import LabelRoundedIcon from '@mui/icons-material/LabelRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
} from '@mui/joy';
import {} from 'next/navigation';

export default function Sidebar() {
  return (
    <List size="sm" sx={{ '--ListItem-radius': '8px', '--List-gap': '4px' }}>
      <ListItem>
        <ListItemButton selected>
          <ListItemDecorator>
            <DashboardRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>数据看板</ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <AssignmentIndRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>管理员管理</ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <AccountBoxRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>用户管理</ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <HistoryEduRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>作品管理</ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <SchoolRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>插画家管理</ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <LabelRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>标签管理</ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <CommentRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>评论管理</ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <CollectionsRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>图片管理</ListItemContent>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton>
          <ListItemDecorator>
            <FolderRoundedIcon fontSize="small" />
          </ListItemDecorator>
          <ListItemContent>收藏夹管理</ListItemContent>
        </ListItemButton>
      </ListItem>
    </List>
  );
}
