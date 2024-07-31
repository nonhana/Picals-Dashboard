import { UserStoreProvider } from '@/store/provider/user-provider';
import DashboardLayout from '@/ui/DashboardLayout';
import Header from '@/ui/Header';
import Sidebar from '@/ui/Sidebar';
import SidebarDrawer from '@/ui/SidebarDrawer';
import { Sheet } from '@mui/joy';
import * as React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <UserStoreProvider>
        <SidebarDrawer />
        <DashboardLayout.Root>
          <DashboardLayout.Header>
            <Header />
          </DashboardLayout.Header>
          <DashboardLayout.SideNav>
            <Sidebar />
          </DashboardLayout.SideNav>
          <DashboardLayout.Main>{children}</DashboardLayout.Main>
        </DashboardLayout.Root>
      </UserStoreProvider>
    </Sheet>
  );
}
