import React, { useCallback } from 'react';

import Toggle from 'Common/components/Toggle';
import Tooltip from 'Common/components/Tooltip';

const ConvertToJPG = (props) => {
  const state = props.state.convertToJPG;

  const onChange = useCallback(val => props.update({ convertToJPG: val }));

  return (
    <div className='setting convertToJPG'>
      <div className='setting-label'>
        <p>Convert To JPG</p>
        <Tooltip>Convert non-JPG images to JPGs. Recommended unless you need an alpha layer.</Tooltip>
      </div>
      <Toggle
        value={state}
        onChange={onChange}
      />
    </div>
  );
};

export default ConvertToJPG;
