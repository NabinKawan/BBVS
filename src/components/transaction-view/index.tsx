import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import ContractService from '../../services/ContractService';
import Moment from 'react-moment';
import { providers } from 'ethers';
import { useBreakpoint } from '../../lib/hooks/use-breakpoint';
import { useIsMounted } from '../../lib/hooks/use-is-mounted';
import { isEmpty } from '../../utils/helperUtils';

interface ITransactionView {
  tx: providers.TransactionResponse;
  className?: string;
}
export default function TransactionView({ tx, className }: ITransactionView) {
  const [block, setBlock] = useState<providers.Block | null>(null);
  const [votes, setVotes] = useState({ voterId: '', votedTo: [] });
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  const getTitleDescription = (
    title: string,
    description: any,
    align = 'text-left',
    bgColor?: string,
  ) => {
    if (isMounted && ['xs', 'sm'].includes(breakpoint)) {
      return (
        <div className="flex flex-col space-y-3">
          <p className={cn('font-medium text-md text-gray-800')}>{title}</p>
          {bgColor ? (
            <p className={cn('text-gray-700 w-fit', bgColor, bgColor && 'px-2 py-1')}>
              {description}
            </p>
          ) : (
            <p className={cn('text-gray-700 w-64 truncate ... ', bgColor, bgColor && 'px-2 py-1')}>
              {description}
            </p>
          )}
        </div>
      );
    }
    return (
      <div className="flex flex-col space-y-3">
        <p className={cn('font-medium text-md text-gray-800', align)}>{title}</p>
        <p className={cn('text-gray-700', align, bgColor, bgColor && 'px-2 py-1')}>{description}</p>
      </div>
    );
  };

  useEffect(() => {
    ContractService.getBlock(tx.blockNumber!).then((val) => {
      if (val) {
        setBlock(val);
      }
    });

    const data = ContractService.decodeData(tx.data);
    setVotes({ voterId: data.inputs[0], votedTo: data.inputs[1] });
  }, []);
  return (
    <div
      className={cn(
        'flex flex-col border border-gray-200 rounded-sm p-6 space-y-6 divide-y-[1.9px] font-sans',
        className,
      )}
    >
      {getTitleDescription('Block Hash', tx.blockHash)}
      <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between pt-6">
        <div>{getTitleDescription('To (contract address)', tx.to)}</div>
        <div>{getTitleDescription('Block Number', tx.blockNumber, 'text-right')}</div>
      </div>
      <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between pt-6">
        <div>{getTitleDescription('From', tx.from)}</div>
        <div>{getTitleDescription('Confirmation', tx.confirmations, 'text-right')}</div>
      </div>
      <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between pt-6">
        <div>{getTitleDescription('Voter ID', votes.voterId, '', 'bg-pink-300')}</div>
        {block && (
          <div>
            {getTitleDescription(
              'Voted on',
              <Moment format="dddd, MMMM Do YYYY, h:mm:ss a">{block.timestamp * 1000}</Moment>,
              'text-right',
              'bg-yellow-300',
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-between pt-6">
        <div className="flex flex-col space-y-3">
          <p className={cn('font-medium text-md text-gray-800')}>Votes</p>
          <div className="flex space-x-3">
            {votes.votedTo.map(
              (candidateId: string) =>
                !isEmpty(candidateId) && (
                  <p className="bg-green-200 text-green-700 px-2 py-1 rounded-lg inline-flex">
                    {candidateId}
                  </p>
                ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
