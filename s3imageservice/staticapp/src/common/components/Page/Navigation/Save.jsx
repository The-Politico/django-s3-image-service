import React from 'react';
import Button from 'Common/components/Button';

const Save = (props) => {
  if (!props.onSave) { return null; }

  return (
    <Button id='submitForm' onClick={props.onSave} outline>{props.children}</Button>
  );
};

Save.defaultProps = {
  children: 'Save',
};

export default Save;
