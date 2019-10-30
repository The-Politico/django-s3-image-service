import React, { Fragment } from 'react';
import classnames from 'classnames';

import { styles } from './styles.scss';

const Ellipsis = (props) => (
  <div onClick={props.onClick} className={classnames('Ellipsis', styles)}>
    <div className='background' />
    {!props.valid ?
      <div className='error-bug'>
        <i className='fas fa-exclamation-circle' />
      </div> :
      <Fragment>
        <div className='dot' />
        <div className='dot' />
        <div className='dot' />
      </Fragment>
    }

  </div>
);

export default Ellipsis;
