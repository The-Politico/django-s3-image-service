import React from 'react';
import classnames from 'classnames';

import ReactTooltip from 'react-tooltip';
import Sizes from './Sizes';
import ConvertToJPG from './ConvertToJPG';
import Compression from './Compression';
import Progressive from './Progressive';

import { styles } from './styles.scss';

const Settings = (props) => {
  return (
    <div className={classnames('settings', styles)}>
      <ConvertToJPG {...props} />
      <Compression {...props} />
      <Progressive {...props} />
      <Sizes {...props} />
      <ReactTooltip />
    </div>
  );
};

export default Settings;
