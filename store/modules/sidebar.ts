import { create } from 'zustand';
import type { SidebarStore } from '../types';

const useSidebarStore = create<SidebarStore>((set) => ({
  visible: false,
  toggle: () => set((state) => ({ visible: !state.visible })),
}));

export default useSidebarStore;
