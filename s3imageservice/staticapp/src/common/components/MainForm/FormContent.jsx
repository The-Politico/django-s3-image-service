import React from 'react';
import classnames from 'classnames';

const FormContent = (props) => {
  const { id, classNames, label, help, rawErrors = [], schema, children } = props;
  return (
    <div id={`${id}-${label}`} className={classNames}>
      <div className='main-form-input-container'>
        <label className={classnames('control-label', { set: schema.title })} htmlFor={id}>
          <span>{label}</span>
        </label>
        {children}
      </div>
      <div className='errors'>
        {rawErrors.map(error => <span key={error}>{error}</span>)}
      </div>
      {help}
    </div>
  );
};

export default FormContent;
