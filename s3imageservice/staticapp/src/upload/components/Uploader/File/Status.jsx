import React, { useMemo } from 'react';

import Complete from './Icons/Complete';
import Failed from './Icons/Failed';
import Pending from './Icons/Pending';
import Uploading from './Icons/Uploading';

const ICONS = {
  complete: Complete,
  failed: Failed,
  pending: Pending,
  uploading: Uploading,
};

const Status = (props) => {
  const { children: status } = props;

  const Icon = useMemo(() => ICONS[status], [status]);

  return (
    <div className='status'>
      <Icon />
    </div>
  );
};

export default Status;
