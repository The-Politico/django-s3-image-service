import React from 'react';
import Button from 'Common/components/Button';

const New = (props) => {
  const { active, href, shouldConfirm } = props;
  if (!active) { return null; }

  const onClick = () => {
    const uSure = shouldConfirm ? confirm('Are you sure you want to leave this page? Unsaved changes will be lost.') : true;

    if (uSure) {
      window.location = href;
    }
  };

  return (
    <div className='newButton'>
      <Button onClick={onClick} outline>
        <i className='fas fa-plus' />
      </Button>
    </div>
  );
};

export default New;
