import React, { useState, useMemo } from 'react';
import classnames from 'classnames';
import groupBy from 'lodash/groupBy';
import mapKeys from 'lodash/mapKeys';
import ReactTooltip from 'react-tooltip';

import usePaginatedState from 'Common/hooks/usePaginatedState';
import getContentByName from 'Common/utils/getContentByName';
import isSameDay from 'Common/utils/isSameDay';
import parseDayFromDate from 'Common/utils/parseDayFromDate';
import displayDate from 'Common/utils/displayDate';

import ViewSwitcher from './ViewSwitcher';
import FilterToggle from './FilterToggle';
import DetailsView from './DetailsView';
import GridView from './GridView';
import NewUpload from './NewUpload';
import Pagination from 'Common/components/Pagination';

import { styles } from './styles.scss';

import { USER_ID } from 'Common/constants/user';

const CMS_PAGE_SIZE = parseInt(getContentByName('CMS_PAGE_SIZE'));

const PageContent = (props) => {
  const [view, updateView] = useState('grid');
  const [filter, updateFilter] = useState(true);
  const fetchOpts = useMemo(() => filter ?
    {
      endpoint: 'upload',
      action: 'filter_for_user',
      params: { user: USER_ID },
    } :
    {
      endpoint: 'upload',
    },
  [filter]
  );

  const state = usePaginatedState(fetchOpts);
  if (!state) { return null; }

  const {
    data: [data],
  } = state;

  const orderedData = useMemo(() => {
    if (!data) { return null; };
    const { results } = data;

    const resultsByDay = groupBy(results, d => parseDayFromDate(d.timestamp).toISOString());
    const today = new Date();
    const yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date());

    return mapKeys(resultsByDay, (v, k) => {
      if (isSameDay(k, today)) {
        return 'Today';
      }
      if (isSameDay(k, yesterday)) {
        return 'Yesterday';
      } else {
        return displayDate(k);
      }
    });
  }, [data]);

  if (!data) { return null; }

  return (
    <div className={classnames('PageContent', styles)}>
      <ReactTooltip />
      <NewUpload />
      <div className='controls'>
        <FilterToggle state={filter} update={updateFilter} />
        <Pagination itemsPerPage={CMS_PAGE_SIZE} {...state} />
        <ViewSwitcher active={view} update={updateView} />
      </div>

      {view === 'details' &&
        <DetailsView>{orderedData}</DetailsView>
      }

      {view === 'grid' &&
        <GridView>{orderedData}</GridView>
      }
    </div>
  );
};

export default PageContent;
