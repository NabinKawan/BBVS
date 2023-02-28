import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import RoundedIconBtn from '../../shared/button/RoundedIconBtn';
import TextInputField from '../admin/TextInputField';

interface ISearchView {
  handleSearch: any;
}
export default function SearchView({ handleSearch }: ISearchView) {
  const handleInput = (id: any, value: any) => {
    handleSearch(value);
  };
  return (
    <div className="flex h-content items-center my-6  space-x-2">
      <TextInputField
        id={'search'}
        fullWidth
        // title={'First Name'}
        isRequired={true}
        placeHolder={'Search by candidate_id, name...'}
        inputHandler={handleInput}
      />
      {/* <div className="flex h-12 w-32">
        <RoundedIconBtn
          icon={<FiSearch size={20} />}
          text={'Search'}
          // loading={loading}
          bgColor={'bg-primary '}
          onClick={() => {
            handleSearch(searchValue);
          }}
        />
      </div> */}
    </div>
  );
}
