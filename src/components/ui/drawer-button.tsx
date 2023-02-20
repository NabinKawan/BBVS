import React from 'react';
import { useDrawer } from '../drawer-view/context';
import { AiOutlineMenu } from 'react-icons/ai';

export default function DrawerButton() {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const handleDrawer = () => {
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };
  return (
    <div
      className="group inline-flex lg:hidden rounded-full p-3 bg-gray-200  hover:bg-blue-400 cursor-pointer mb-4"
      onClick={handleDrawer}
    >
      <AiOutlineMenu className="group-hover:text-white" size={18} />
    </div>
  );
}
