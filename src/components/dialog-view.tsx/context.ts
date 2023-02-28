import { atom, useAtom } from 'jotai';

export type DIALOG_VIEW = 'EDIT_CANDIDATE_VIEW' | 'EDIT_VOTER_VIEW';
const dialogAtom = atom({ isOpen: false, view: '', dialogProps: null });

export function useDialog() {
  const [state, setState] = useAtom(dialogAtom);
  const openDialog = (view: DIALOG_VIEW, dialogProps: any = null) =>
    setState({ ...state, isOpen: true, view, dialogProps });
  const closeDialog = () => {
    setState({ ...state, isOpen: false, dialogProps: null });
  };

  return {
    ...state,
    openDialog,
    closeDialog,
  };
}
