import React, { useCallback } from 'react';

import Toggle from 'Common/components/Toggle';
import Tooltip from 'Common/components/Tooltip';

const Progressive = (props) => {
  const state = props.state.progressive;

  const onChange = useCallback(val => props.update({ progressive: val }));

  return (
    <div className='setting progressive'>
      <div className='setting-label'>
        <p>Progressive</p>
        <Tooltip>Convert JPGs to load progressively instead of top-down. Recommended for all images.</Tooltip>
      </div>
      <Toggle
        value={state}
        onChange={onChange}
      />
    </div>
  );
}; ;

export default Progressive;
