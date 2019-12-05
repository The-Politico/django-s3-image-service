import React, { useCallback } from 'react';

import api from 'Common/utils/api';
import useFetch from 'Common/hooks/useFetch';
import getContentByName from 'Common/utils/getContentByName';

import Page from 'Common/components/Page';
import PageContent from './PageContent';

import BREADCRUMBS from 'Detail/constants/breadcrumbs';

const UPLOAD_ID = getContentByName('UPLOAD');

const App = (props) => {
  const uploadFetch = useCallback(() => api.upload.GET({ instance: UPLOAD_ID }), []);
  const [data] = useFetch(uploadFetch);
  if (!data) { return null; }

  return (
    <Page
      breadcrumbs={BREADCRUMBS(data.slug)}
      break-well
      allowNew
      shouldConfirm={false}
      newLink={'../../upload/'}
      lastUpdated={data.timestamp}
    >
      {{
        mainForm: (
          <PageContent {...data} />
        ),
      }}
    </Page>
  );
};

export default App;
