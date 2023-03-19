import React, { useContext, useEffect } from 'react';
import AdminContainer from '../components/admin/AdminContainer';
import AdminMenu from '../components/admin/AdminMenu';
import Router from 'next/router';
import AdminContext from '../context/admin/AdminContext';
import { AdminContextDto, CandidateContextDto, VoterContextDto } from '../models/dto/ContextDtos';
import CachService from '../services/CacheService';
import { CachNamesEnum } from '../models/enums/CacheEnums';
import CandidateContext from '../context/candidate/CandidateContext';
import ServerOp from '../services/ServerOp';
import VoterContext from '../context/voter/VoterContext';
import { AdminDto } from '../models/dto/ServerOpDtos';

export default function Admin() {
  // @ts-ignore
  const adminProvider = useContext(AdminContext) as AdminContextDto;
  //@ts-ignore
  const candidateProvider = useContext(CandidateContext) as CandidateContextDto;
  // @ts-ignore
  const voterProvider = useContext(VoterContext) as VoterContextDto;

  useEffect(() => {
    CachService.getCacheData(CachNamesEnum.Admin).then((value) => {
      if (value) {
        adminProvider.setAccessToken(value.access_token);

        // fetching candidates datas
        ServerOp.getAllCandidates(value.access_token).then((value) => {
          if (value) {
            if (value !== 'unauthorized') {
              candidateProvider.setCandidates([...value.content]);
            } else {
              CachService.deleteCache(CachNamesEnum.Admin).then((value) => {
                if (value) {
                  Router.push('/adminLogin');
                }
              });
            }
          }
        });

        // fetching voters datas
        ServerOp.getAllVoters(value.access_token).then((value) => {
          if (value) {
            if (value !== 'unauthorized') {
              voterProvider.setVoters([...value.content]);
            } else {
              CachService.deleteCache(CachNamesEnum.Admin).then((value) => {
                if (value) {
                  Router.push('/adminLogin');
                }
              });
            }
          }
        });

        // fetching admin profile
        ServerOp.getAdmin(value.user_id, value.access_token).then((value: AdminDto | any) => {
          if (value) {
            if (value !== 'unauthorized') {
              adminProvider.setAdmin(value);
            } else {
              CachService.deleteCache(CachNamesEnum.Admin).then((value) => {
                if (value) {
                  Router.push('/adminLogin');
                }
              });
            }
          }
        });
      } else {
        Router.push('/adminLogin');
      }
    });
  }, []);
  console.log({ candidates: candidateProvider.candidates });
  return (
    adminProvider.accessToken !== '' && (
      <div className="w-full h-screen font-sans">
        <div className="flex flex-row">
          {/* menu */}
          <AdminMenu className="hidden lg:flex flex-col bg-white drop-shadow-2xl shadow-blue-900 h-screen w-fit p-8" />
          {/* Admin */}
          <AdminContainer />
        </div>
      </div>
    )
  );
}
