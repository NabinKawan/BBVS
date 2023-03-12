import { providers } from 'ethers';
import React, { useEffect, useRef, useState } from 'react';
import TransactionView from '../components/transaction-view';
import ContractService from '../services/ContractService';
import RoundedTextBtn from '../shared/button/RoundedTextBtn';

export default function CheckVote() {
  const [searchText, setSearchText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [result, setResult] = useState<providers.TransactionResponse | null>(null);
  const [error, setError] = useState(false);

  const onSearch = () => {
    if (searchText) {
      setLoading(true);
      setError(false);
      ContractService.getTransaction(searchText)
        .then((val) => {
          if (val) {
            setResult({ ...val });
            setLoading(false);
          }
        })
        .catch((e) => {
          setLoading(false);
          setResult(null);
          setError(true);
        });
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto items-start py-20 font-sans  bg-white px-4  xl:px-20 2xl:px-64">
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 px-4 sm:px-12 w-full justify-between items-start lg:items-center lg:px-20  2xl:px-20 3xl:px-44">
        <div className="flex items-center -ml-4 ">
          <img src="logos/logo.png" />
          <div className="flex flex-col justify-center">
            <p className="font-bold  text-2xl text-[#202020]">BBVS</p>
            <p className="font-medium text-base text-[#979797]">Blockchain Based Voting System</p>
          </div>
        </div>
        <p className="text-2xl lg:text-3xl  text-gray-800"> Check your vote of the election</p>
      </div>
      <div className="flex flex-col justify-center h-content w-full items-center mt-24 sm:px-8 lg:px-44">
        <input
          className={`bg-[#F7F7F7] w-full rounded-xl text-lg px-6 py-3 h-16  outline-none text-gray-600`}
          placeholder={'Search your vote by transaction hash'}
          value={searchText}
          onChange={(e: any) => {
            setSearchText(e.target.value);
          }}
        />
        <div className="flex mt-8 h-12">
          <RoundedTextBtn
            text={'Search'}
            type="submit"
            bgColor={'bg-primary'}
            onClick={onSearch}
            loading={isLoading}
          />
        </div>
        {error && (
          <div className="flex items-center mt-12 mb-4 space-x-4">
            <img className="h-14 " src="/images/record-not-found.png" />
            <p className="text-gray-700">No result found</p>
          </div>
        )}
        {result && <TransactionView tx={result} className="mt-12" />}
      </div>
    </div>
  );
}
