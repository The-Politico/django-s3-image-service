import React, { useRef } from 'react';
import classnames from 'classnames';

import useOpen from './hooks/open';
import useFormValidCallback from './hooks/formValidCallback';

import Form from 'react-jsonschema-form';
import FormContent from './FormContent';
import Ellipsis from './Ellipsis';

import { styles } from './styles.scss';

const ContextForm = React.forwardRef((props, ref) => {
  const { formIsValid } = props;
  const self = useRef(null);
  const [open, updateOpen] = useOpen(self);
  useFormValidCallback({ formIsValid, open, updateOpen });

  return (
    <div ref={self} className={classnames('ContextForm', styles)}>
      <Ellipsis valid={formIsValid} onClick={() => { updateOpen(!open); }} />
      <div className={classnames('form-container', { open })}>
        <div className='arrow' />
        <div className='form-inner-container'>
          <Form
            {...props}
            ref={ref}
            autocomplete='off'
            FieldTemplate={FormContent}
          ><div /></Form>
        </div>
      </div>
    </div>
  );
});

export default ContextForm;
