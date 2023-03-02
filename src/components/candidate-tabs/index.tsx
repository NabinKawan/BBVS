import { filterCandidateStatus } from '../../utils/candidateUtils';
import { Tab, TabPanel, TabPanels } from '../ui/tab';
import cn from 'classnames';
import { CandidateDto } from '../../models/dto/ServerOpDtos';
import CandidateList from '../candidate-list';

interface ICandidateTabs {
  candidates: CandidateDto[];
}
export default function CandidateTabs({ candidates }: ICandidateTabs) {
  const filteredCandidates = filterCandidateStatus(candidates);

  const categories = filteredCandidates;

  return (
    <div className="flex w-full justify-between">
      <div className="w-full">
        <Tab.Group>
          <Tab.List className="flex space-x-4 font-inter text-xs md:text-sm mt-6 overflow-x-auto">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  cn(
                    'px-4 rounded-xl py-1  border leading-5 text-white bg-white',
                    selected
                      ? 'bg-primary text-white focus:ring-0'
                      : 'text-gray-500 hover:bg-gray-400 hover:text-white ',
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <TabPanels>
            {Object.values(categories).map((candidates, idx) => (
              <TabPanel key={idx} className="mt-4">
                {<CandidateList candidates={candidates} />}
              </TabPanel>
            ))}
          </TabPanels>
        </Tab.Group>
      </div>
    </div>
  );
}
