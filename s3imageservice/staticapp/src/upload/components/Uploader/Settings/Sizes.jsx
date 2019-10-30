import React from 'react';
import { Typeahead } from '@politico/interactive-style-sketch';
import Tooltip from 'Common/components/Tooltip';

const filterOptions = (_, context) => context.text.match(/^\d*$/);

const Sizes = (props) => {
  const { update } = props;
  const state = props.state.sizes;

  return (
    <div className='setting sizes'>
      <div className='setting-label'>
        <p>Width (px)</p>
        <Tooltip>Choose widths to resize the images to. Leave blank to use the original size. Heights will be calculated automatically.</Tooltip>
      </div>
      <Typeahead
        id='upload-setting-sizes'
        placeholder='Choose image resize widths. Leave blank to use the original size.'
        label=''
        help=''
        selected={state.map(o => ({ id: `${o}`, label: `${o}` }))}
        options={state.map(o => ({ id: `${o}`, label: `${o}` }))}
        multiple
        allowNew={filterOptions}
        onChange={(selections) => {
          const choices = selections
            .map(s => {
              const parsed = parseInt(s.label);
              if (isNaN(parsed)) {
                return null;
              } else {
                return parsed;
              }
            })
            .filter(s => s);
          update({ sizes: choices });
        }}
      />
    </div>
  );
};

export default Sizes;
