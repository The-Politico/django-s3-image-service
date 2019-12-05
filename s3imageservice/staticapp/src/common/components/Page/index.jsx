import React from 'react';
import classnames from 'classnames';

import Navigation from './Navigation';

import { styles } from './styles.scss';

const Page = (props) => {
  return (
    <div className={classnames('page', styles)}>
      <Navigation {...props} />
      <article className={classnames({ 'break-well': props['break-well'] })}>
        <div className='section'>
          <div className='main-content'>
            {props.children.mainForm}
          </div>
        </div>
      </article>
    </div>
  );
};

export default Page;
