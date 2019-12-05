import React from 'react';
import dateFnsFormat from 'date-fns/format';
import classnames from 'classnames';

const Info = (props) => {
  const { error, lastUpdated } = props;
  const text = error || (lastUpdated ? `Last updated at ${dateFnsFormat(new Date(lastUpdated), 'h:mm A')} on ${dateFnsFormat(new Date(lastUpdated), 'MM/DD/YYYY')}` : null);

  return (
    <div className={classnames('info', { 'form-error': !!error, 'form-info': !error })}>
      {text}
    </div>
  );
};

export default Info;
