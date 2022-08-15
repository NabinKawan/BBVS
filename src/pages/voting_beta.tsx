import React, { useEffect, useState } from 'react';
import { candidates } from '../dummy/data';
import { useRouter } from 'next/router';
import VotingContainer from '../components/vote/VotingContainer';
import VotingMenu from '../components/vote/VotingMenu';
import Swal from 'sweetalert2';
import 'animate.css';

export default function VotingBeta() {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen font-sans bg-AdminBg">
      <VotingMenu />
      <VotingContainer />
    </div>
  );
}
