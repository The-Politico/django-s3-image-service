import React, { useCallback } from 'react';
import classnames from 'classnames';

import addFilesToQueue from 'Upload/utils/addFilesToQueue';

import { styles } from './styles.scss';

const Instructions = (props) => {
  const { active, updateFiles, error, updateError } = props;
  if (!active) { return null; }

  const onChange = useCallback(
    e => addFilesToQueue({ additions: Array.from(e.target.files), updateFiles, updateError }),
    [updateFiles, updateError]
  );

  return (
    <div className={classnames('instructions', styles)}>
      <label
        htmlFor='instructions-input'
        className={classnames('instructions-label', { hasError: error })}
      >
        {error &&
          <span className='error'>{error}<br /></span>
        }
        <span>Drop files or click to upload images.</span>
      </label>
      <input
        id='instructions-input'
        type='file'
        multiple='multiple'
        onChange={onChange}
      />
    </div>
  );
};

export default Instructions;
