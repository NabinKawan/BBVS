import React, { useState } from 'react';
import AdminContext from './AdminContext';
import { AdminContainerEnum } from '../../models/enums/ContainerEnums';

interface AdminStateProps {
  children: any;
}

export default function AdminState({ children }: AdminStateProps) {
  const [currentContainer, setCurrentContainer] = useState(AdminContainerEnum.CandidateDetails);

  return (
    // @ts-ignore: Unreachable code error
    <AdminContext.Provider value={{ currentContainer, setCurrentContainer }}>
      {children}
    </AdminContext.Provider>
  );
}
