import React from 'react';
import ReactDOM from 'react-dom';
import getContentByName from 'Common/utils/getContentByName';

import App from 'Upload/components/App';

import 'Common/theme/base.scss';

const USER = getContentByName('USER');
const USER_ID = getContentByName('USER_ID');

const BREADCRUMBS = [

];

ReactDOM.render(
  <App
    breadcrumbs={BREADCRUMBS}
    user={{
      name: USER,
      id: USER_ID,
    }}
  />,
  document.getElementById('app')
);
