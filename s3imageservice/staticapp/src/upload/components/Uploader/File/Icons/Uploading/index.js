import React from 'react';
import classnames from 'classnames';

import ClipLoader from 'react-spinners/ClipLoader';

import { styles } from './styles.scss';

const Uploading = (props) => (
  <div className={classnames('status-uploading', styles)}>
    <ClipLoader
      sizeUnit='px'
      size={30}
      color='#28a745'
      loading
    />
  </div>
);

export default Uploading;
