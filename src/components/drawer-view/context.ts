import { atom, useAtom } from 'jotai';

export type DrawerType = 'ADMIN' | 'VOTING';

const drawerAtom = atom({ isOpen: false, drawerType: 'ADMIN' });

export function useDrawer() {
  const [state, setState] = useAtom(drawerAtom);
  const openDrawer = (drawerType: DrawerType) => setState({ isOpen: true, drawerType });
  const closeDrawer = () => {
    setState({ ...state, isOpen: false });
  };

  return {
    ...state,
    openDrawer,
    closeDrawer,
  };
}
