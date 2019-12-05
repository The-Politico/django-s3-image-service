import React from 'react';
import classnames from 'classnames';

const FormContent = (props) => {
  const { id, classNames, label, help, required, rawErrors = [], schema, children } = props;
  return (
    <div id={`${id}-${label}`} className={classNames}>
      <div className='input-container'>
        <label className={classnames('control-label', { set: schema.title })} htmlFor={id}>
          <span>{label}{required ? '*' : ''}</span>
        </label>
        {children}
      </div>
      <div className='errors'>
        <span>{rawErrors[0]}</span>
      </div>
      <div className='help'>
        {rawErrors.length === 0 &&
          <span>{ help }</span>
        }
      </div>

    </div>
  );
};

export default FormContent;
