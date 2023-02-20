import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import EditCandidateView from '../edit-candidate-view';
import EditVoterView from '../edit-voter-view';
import { DIALOG_VIEW, useDialog } from './context';

const renderDialogContent = (dialogView: DIALOG_VIEW | string) => {
  if (dialogView === 'EDIT_CANDIDATE_VIEW') {
    return <EditCandidateView />;
  } else if (dialogView === 'EDIT_VOTER_VIEW') {
    return <EditVoterView />;
  }
  return <></>;
};

/*
Dialog Container is used to show dynamic modal views. 
*/
export default function DialogContainer() {
  const { view, isOpen, closeDialog } = useDialog();
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        className="fixed flex items-center justify-center inset-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden p-4 text-center sm:p-6 lg:p-8 xl:p-10 3xl:p-14"
        onClose={closeDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 z-40 cursor-pointer bg-gray-700 bg-opacity-60 backdrop-blur" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-105"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-105"
        >
          <div className="relative z-50 inline-block w-full text-left align-middle sm:w-auto rounded-xl bg-white ">
            {view && renderDialogContent(view)}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
