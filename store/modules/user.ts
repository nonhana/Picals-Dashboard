import { createStore } from 'zustand/vanilla';
import type { UserStore } from '../types';

export const defaultInitState = {
  id: '1',
  name: 'non_hana',
  email: 'zhouxiang757@gmail.com',
  avatar: 'https://dummyimage.com/286x286/000/fff',
};

export const createUserStore = (initState = defaultInitState) => {
  return createStore<UserStore>((set) => ({
    userInfo: initState,
    setUserInfo: (userInfo) => set({ userInfo }),
  }));
};
