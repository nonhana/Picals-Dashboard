'use client';

import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import CollectionsRoundedIcon from '@mui/icons-material/CollectionsRounded';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
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
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

const links: {
  name: string;
  icon: React.ReactNode;
  href: string;
}[] = [
  {
    name: '数据看板',
    icon: <DashboardRoundedIcon fontSize="small" />,
    href: '/dashboard',
  },
  {
    name: '管理员管理',
    icon: <AssignmentIndRoundedIcon fontSize="small" />,
    href: '/dashboard/admins',
  },
  {
    name: '用户管理',
    icon: <AccountBoxRoundedIcon fontSize="small" />,
    href: '/dashboard/users',
  },
  {
    name: '作品管理',
    icon: <HistoryEduRoundedIcon fontSize="small" />,
    href: '/dashboard/works',
  },
  {
    name: '插画家管理',
    icon: <SchoolRoundedIcon fontSize="small" />,
    href: '/dashboard/illustrators',
  },
  {
    name: '标签管理',
    icon: <LabelRoundedIcon fontSize="small" />,
    href: '/dashboard/labels',
  },
  {
    name: '评论管理',
    icon: <CommentRoundedIcon fontSize="small" />,
    href: '/dashboard/comments',
  },
  {
    name: '图片管理',
    icon: <CollectionsRoundedIcon fontSize="small" />,
    href: '/dashboard/images',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <List
      size="sm"
      sx={{
        position: 'sticky',
        top: 80,
        '--ListItem-radius': '8px',
        '--List-gap': '6px',
        '--ListItem-paddingY': '6px',
      }}
    >
      {links.map((link) => (
        <Link key={link.href} href={link.href} passHref>
          <ListItem>
            <ListItemButton selected={pathname === link.href}>
              <ListItemDecorator>{link.icon}</ListItemDecorator>
              <ListItemContent>{link.name}</ListItemContent>
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  );
}
