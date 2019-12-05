import React, { useCallback } from 'react';
import classnames from 'classnames';

import Toggle from 'Common/components/Toggle';
import Tooltip from 'Common/components/Tooltip';

import { styles } from './styles.scss';

const FilterToggle = (props) => {
  const { state, update } = props;

  const onChange = useCallback(() => {
    update(val => !val);
  });

  return (
    <div className={classnames('filter-toggle', styles)}>
      <p>Only Mine</p>
      <Tooltip>Filter out images uploaded by users other than you.</Tooltip>
      <Toggle
        value={state}
        onChange={onChange}
      />
    </div>
  );
};

export default FilterToggle;
