import React, { useContext } from 'react';
import AdminContext from '../../context/admin/AdminContext';
import { AdminContextDto } from '../../models/dto/ContextDtos';
import { AdminContainerEnum } from '../../models/enums/ContainerEnums';
import AddCandidates from './containers/AddCandidates';
import AddVoters from './containers/AddVoters';
import CandidateDetails from './containers/CandidatesDetails';
import Election from './containers/Election';
import VoterDetails from './containers/VotersDetails';
import { useDrawer } from '../drawer-view/context';
import DrawerButton from '../ui/drawer-button';

export default function AdminContainer() {
  // @ts-ignore: Unreachable code error
  const adminProvider = useContext(AdminContext) as AdminContextDto;

  let container = <CandidateDetails />;

  switch (adminProvider.currentContainer) {
    case AdminContainerEnum.CandidateDetails:
      container = <CandidateDetails />;
      break;
    case AdminContainerEnum.VoterDetails:
      container = <VoterDetails />;
      break;
    case AdminContainerEnum.AddCandidates:
      container = <AddCandidates />;
      break;
    case AdminContainerEnum.AddVoters:
      container = <AddVoters />;
      break;
    case AdminContainerEnum.Election:
      container = <Election />;
    default:
    // default
  }
  return (
    <div className="w-full  h-screen overflow-y-auto bg-AdminBg p-8">
      <DrawerButton />
      {container}
    </div>
  );
}
