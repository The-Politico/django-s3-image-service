import React, { useCallback } from 'react';
import classnames from 'classnames';

import DetailsIcon from './DetailsIcon';
import GridIcon from './GridIcon';

import { styles } from './styles.scss';

const ViewSwitcher = (props) => {
  const { update, active } = props;

  const updateToDetails = useCallback(() => {
    update('details');
  }, [update]);

  const updateToGrid = useCallback(() => {
    update('grid');
  }, [update]);

  return (
    <div className={classnames('view-switcher', styles)}>
      <button className={classnames('switch', { active: active === 'grid' })} onClick={updateToGrid}>
        <GridIcon />
      </button>
      <button className={classnames('switch', { active: active === 'details' })} onClick={updateToDetails}>
        <DetailsIcon />
      </button>
    </div>
  );
};

export default ViewSwitcher;
