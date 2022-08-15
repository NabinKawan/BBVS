import React from 'react';
import Admin from '../components/admin/AdminContainer';
import Menu from '../components/admin/AdminMenu';

export default function admin() {
  return (
    <div className="w-full h-screen font-sans">
      <div className="flex flex-row">
        {/* menu */}
        <Menu />

        {/* Admin */}
        <Admin />
      </div>
    </div>
  );
}
