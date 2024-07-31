export interface SidebarStore {
  visible: boolean;
  toggle: () => void;
}

export interface UserStore {
  userInfo: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  setUserInfo: (userInfo: UserStore['userInfo']) => void;
}
