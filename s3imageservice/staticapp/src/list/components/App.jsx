import React, { Fragment, useCallback } from 'react';

import BREADCRUMBS from 'List/constants/breadcrumbs';

import PageContent from './PageContent';

import Page from 'Common/components/Page';

const App = (props) => {
  return (
    <Page
      breadcrumbs={BREADCRUMBS}
      break-well
      allowNew
      shouldConfirm={false}
      newLink={'./upload/'}
    >
      {{
        mainForm: (
          <PageContent />
        ),
      }}
    </Page>
  );
};

export default App;
