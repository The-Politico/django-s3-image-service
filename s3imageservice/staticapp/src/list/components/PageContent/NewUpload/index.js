import React from 'react';
import classnames from 'classnames';
import Button from 'Common/components/Button';

import { styles } from './styles.scss';

const NewUpload = (props) => (
  <div className={classnames('new-upload-container', styles)}>
    <Button onClick={() => { window.location = './upload'; }}>Upload New Image</Button>
  </div>
);

export default NewUpload;
