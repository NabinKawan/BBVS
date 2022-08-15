import React from 'react';

interface TextInputFieldProps {
  title: string;
  isRequired: boolean;
  placeHolder: string;
}

export default function TextInputField({ title, isRequired, placeHolder }: TextInputFieldProps) {
  return (
    <div className="flex flex-col w-64  font-medium text-sm justify-start space-y-2">
      <p className="text-[#424040]">
        {title} {isRequired && <span className="text-red-500">*</span>}
      </p>

      <input
        className="bg-[#F7F7F7] rounded-xl text-[#242424] text-base px-6 py-3 outline-none"
        placeholder={placeHolder}
      />
    </div>
  );
}
