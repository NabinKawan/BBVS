import React, { useContext } from 'react';
import AdminContext from '../../context/admin/AdminContext';
import { AdminContextDto } from '../../models/dto/ContextDtos';
import { AdminContainerEnum } from '../../models/enums/ContainerEnums';
import AddCandidates from './containers/AddCandidates';
import CandidateDetails from './containers/CandidateDetails';

export default function AdminContainer() {
  // @ts-ignore: Unreachable code error
  const containerProvider = useContext(AdminContext) as AdminContextDto;

  let container = <CandidateDetails />;

  switch (containerProvider.currentContainer) {
    case AdminContainerEnum.CandidateDetails:
      container = <CandidateDetails />;
      break;
    case AdminContainerEnum.AddCandidates:
      container = <AddCandidates />;
      break;
    default:
    // default
  }
  return <div className="w-3/4 h-screen overflow-y-auto bg-AdminBg p-8">{container}</div>;
}
