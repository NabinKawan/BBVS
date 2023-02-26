import React from 'react';
import { DrawerType, useDrawer } from '../drawer-view/context';
import { AiOutlineMenu } from 'react-icons/ai';

interface IDrawerButton {
  drawerType?: DrawerType;
}
export default function DrawerButton({ drawerType }: IDrawerButton) {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const handleDrawer = () => {
    if (isOpen) {
      closeDrawer();
    } else {
      drawerType && openDrawer(drawerType);
    }
  };
  return (
    <div
      className="group inline-flex lg:hidden rounded-full p-3 bg-gray-200  hover:bg-primary cursor-pointer mb-4"
      onClick={handleDrawer}
    >
      <AiOutlineMenu className="group-hover:text-white" size={18} />
    </div>
  );
}
