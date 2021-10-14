import React, { useState, useMemo, useCallback, useEffect } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
// import ShowcaseCheckbox from '@site/src/components/showcase/ShowcaseCheckbox';
// import ShowcaseSelect from '@site/src/components/showcase/ShowcaseSelect';
import ShowcaseCard from '@site/src/components/showcase/ShowcaseCard';
import ShowcaseHeader from '@site/src/components/showcase/ShowcaseHeader';

import { useHistory, useLocation } from '@docusaurus/router';

import { toggleListItem } from '../../utils/jsUtils';

import { SortedApplications, Application } from '../../data/applications';
import { Tag, TagType, Tags, TagList } from '../../data/tags';

type Operator = 'OR' | 'AND';

const TITLE = 'AIR Application Showcase';
const DESCRIPTION = 'See what developers are building with the AIR SDK';
const EDIT_URL =
  'https://github.com/airsdk/airsdk.dev/edit/main/src/data/applications.tsx';

function filterApplications(
  applications: Application[],
  selectedTags: TagType[],
  operator: Operator
) {
  if (selectedTags.length === 0) {
    return applications;
  }
  return applications.filter((application) => {
    if (application.tags.length === 0) {
      return false;
    }
    if (operator === 'AND') {
      return selectedTags.every((tag) => application.tags.includes(tag));
    } else {
      return selectedTags.some((tag) => application.tags.includes(tag));
    }
  });
}

function usefilteredApplications(
  applications: Application[],
  selectedTags: TagType[],
  operator: Operator
) {
  return useMemo(
    () => filterApplications(applications, selectedTags, operator),
    [applications, selectedTags, operator]
  );
}

const TagQueryStringKey = 'tags';

function readSearchTags(search: string) {
  return new URLSearchParams(search).getAll(TagQueryStringKey) as TagType[];
}

function replaceSearchTags(search: string, newTags: TagType[]) {
  const searchParams = new URLSearchParams(search);
  searchParams.delete(TagQueryStringKey);
  newTags.forEach((tag) => searchParams.append(TagQueryStringKey, tag));
  return searchParams.toString();
}

function useSelectedTags() {
  // The search query-string is the source of truth!
  const location = useLocation();
  const { push } = useHistory();

  // On SSR / first mount (hydration) no tag is selected
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);

  // Sync tags from QS to state (delayed on purpose to avoid SSR/Client hydration mismatch)
  useEffect(() => {
    const tags = readSearchTags(location.search);
    setSelectedTags(tags);
  }, [location, setSelectedTags]);

  // Update the QS value
  const toggleTag = useCallback(
    (tag: TagType) => {
      const tags = readSearchTags(location.search);
      const newTags = toggleListItem(tags, tag);
      const newSearch = replaceSearchTags(location.search, newTags);
      push({ ...location, search: newSearch });
      // no need to call setSelectedTags, useEffect will do the sync
    },
    [location, push]
  );

  return { selectedTags, toggleTag };
}

interface Props {
  selectedTags: TagType[];
  toggleTag: (tag: TagType) => void;
  operator: Operator;
  setOperator: (op: Operator) => void;
}

// function ShowcaseFilters({ selectedTags, toggleTag, operator, setOperator }: Props) {
//   return (
//     <div className="margin-top--l margin-bottom--md container">
//       <div className="row">
//         {TagList.map((tag) => {
//           const { label, description, icon } = Tags[tag];
//           return (
//             <div key={tag} className="col col--2">
//               <ShowcaseCheckbox
//                 // TODO add a proper tooltip
//                 title={`${label}: ${description}`}
//                 name={tag}
//                 label={
//                   icon ? (
//                     <>
//                       {icon} {label}
//                     </>
//                   ) : (
//                     label
//                   )
//                 }
//                 onChange={() => toggleTag(tag)}
//                 checked={selectedTags.includes(tag)}
//               />
//             </div>
//           );
//         })}
//         <div className="col col--2">
//           <ShowcaseSelect
//             name="operator"
//             label="Filter: "
//             value={operator}
//             onChange={(e) => setOperator(e.target.value as Operator)}
//           >
//             <option value="OR">OR</option>
//             <option value="AND">AND</option>
//           </ShowcaseSelect>
//         </div>
//       </div>
//     </div>
//   );
// }

function ShowcaseCards({
  filteredApplications,
}: {
  filteredApplications: Application[];
}) {
  return (
    <section className="container margin-top--lg">
      <h2>
        {filteredApplications.length} application
        {filteredApplications.length > 1 ? 's' : ''}
      </h2>
      <div className="margin-top--lg">
        {filteredApplications.length > 0 ? (
          <div className="row">
            {filteredApplications.map((app) => (
              <ShowcaseCard
                key={app.title} // Title should be unique
                application={app}
              />
            ))}
          </div>
        ) : (
          <div className={clsx('padding-vert--md text--center')}>
            <h3>No result</h3>
          </div>
        )}
      </div>
    </section>
  );
}

function Showcase() {
  const { selectedTags, toggleTag } = useSelectedTags();
  const [operator, setOperator] = useState<Operator>('OR');
  const filteredApplications = usefilteredApplications(
    SortedApplications,
    selectedTags,
    operator
  );
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <ShowcaseHeader
        title={TITLE}
        description={DESCRIPTION}
        linkText="Add your application"
        linkUrl={EDIT_URL}
      />
      <main className="container margin-vert--lg">
        <ShowcaseCards filteredApplications={filteredApplications} />
      </main>
    </Layout>
  );
}

export default Showcase;
