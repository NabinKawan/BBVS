import React, { useState, useRef } from 'react';
import { AdminDto } from '../../models/dto/ServerOpDtos';
import { AdminContainerEnum } from '../../models/enums/ContainerEnums';
import AdminContext from './AdminContext';

export default function AdminState({ children }: { children: any }) {
  const [currentContainer, setCurrentContainer] = useState(AdminContainerEnum.CandidateDetails);
  const [accessToken, setAccessToken] = useState('');
  const [admin, setAdmin] = useState<AdminDto>({
    admin_id: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    image: '',
  });

  return (
    // @ts-ignore
    <AdminContext.Provider
      // @ts-ignore
      value={{
        currentContainer,
        accessToken,
        admin,
        setAdmin,
        setAccessToken,
        setCurrentContainer,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
