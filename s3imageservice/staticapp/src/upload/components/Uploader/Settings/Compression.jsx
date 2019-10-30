import React, { useCallback } from 'react';

import Toggle from 'Common/components/Toggle';
import Tooltip from 'Common/components/Tooltip';

const Compression = (props) => {
  const state = props.state.compression;

  const onChange = useCallback(val => props.update({ compression: val }));

  return (
    <div className='setting compression'>
      <div className='setting-label'>
        <p>Compression</p>
        <Tooltip>Compress the image to 80% quality (only works on JPGs and images converted to JPGs). Recommended even for full-bleed images.</Tooltip>
      </div>
      <Toggle
        value={state}
        onChange={onChange}
      />
    </div>
  );
};

export default Compression;
