'use client';
import * as React from 'react';
import DashboardLayout from './DashboardLayout';
import Sidebar from './Sidebar';

export default function SidebarDrawer() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    drawerOpen && (
      <DashboardLayout.SideDrawer onClose={() => setDrawerOpen(false)}>
        <Sidebar />
      </DashboardLayout.SideDrawer>
    )
  );
}
