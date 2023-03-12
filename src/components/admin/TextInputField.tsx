import React, { useContext, useEffect, useState } from 'react';
import CandidateContext from '../../context/candidate/CandidateContext';
import { CandidateContextDto, VoterContextDto } from '../../models/dto/ContextDtos';
import cn from 'classnames';
import VoterContext from '../../context/voter/VoterContext';

interface TextInputFieldProps {
  id: string;
  title?: string;
  disabled?: boolean;
  error?: string;
  defaultValue?: string;
  isRequired: boolean;
  placeHolder: string;
  fullWidth?: boolean;
  inputHandler: any;
}

export default function TextInputField({
  id,
  title,
  isRequired,
  placeHolder,
  inputHandler,
  defaultValue = '',
  error = '',
  disabled = false,
  fullWidth = false,
}: TextInputFieldProps) {
  // checking null in default value
  const [value, setValue] = useState(defaultValue);

  // @ts-ignore
  const adminProvider = useContext(CandidateContext) as CandidateContextDto;
  //@ts-ignore
  const voterProvider = useContext(VoterContext) as VoterContextDto;

  useEffect(() => {
    if (adminProvider.clearAddCandidateRef || voterProvider.clearAddVoterRef) {
      setValue('');
    }
  }, [adminProvider.clearAddCandidateRef, voterProvider.clearAddVoterRef]);

  const handleChange = (event: any) => {
    // adding value with their id
    const value = event.target.value;
    inputHandler(id, value);
    setValue(value);
  };
  return (
    <div
      className={cn(
        fullWidth ? 'w-full' : 'w-64',
        'flex flex-col h-full  text-sm justify-start space-y-2',
      )}
    >
      {title && (
        <p className="text-[#424040] font-medium">
          {title} {isRequired && <span className="text-red-500">*</span>}
        </p>
      )}

      <input
        disabled={disabled}
        className={`bg-[#F7F7F7] rounded-xl ${
          disabled ? 'text-gray-400 cursor-not-allowed' : 'text-[#242424]'
        } text-base px-6 py-3  outline-none`}
        placeholder={defaultValue ? defaultValue : placeHolder}
        value={value}
        onChange={handleChange}
      />
      {error && <p className="font-normal text-xs text-red-500">{error}</p>}
    </div>
  );
}
