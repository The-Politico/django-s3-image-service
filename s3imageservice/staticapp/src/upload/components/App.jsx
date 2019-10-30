import React, { useState } from 'react';

import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import BREADCRUMBS from 'Upload/constants/breadcrumbs';

import Page from 'Common/components/Page';
import Uploader from './Uploader';

const App = props => {
  const [error, updateError] = useState(null);

  return (
    <Page
      breadcrumbs={BREADCRUMBS}
      break-well
      allowNew
      newLink={'./'}
    >
      {{
        mainForm: (
          <DndProvider backend={HTML5Backend}>
            <Uploader
              error={error}
              updateError={updateError}
            />
          </DndProvider>
        ),
      }}
    </Page>
  );
};

export default App;
