import React from 'react';
import classnames from 'classnames';

import Form from 'react-jsonschema-form';
import FormContent from './FormContent';

import { styles } from './styles.scss';

const MainForm = React.forwardRef((props, ref) => {
  return (
    <div className={classnames('main-form', styles)}>
      <Form
        {...props}
        ref={ref}
        autocomplete='off'
        FieldTemplate={FormContent}
      ><div /></Form>
    </div>
  );
});

export default MainForm;
