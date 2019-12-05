import React from 'react';
import classnames from 'classnames';

import { Text } from '@politico/interactive-style-sketch';

import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import { styles } from './styles.scss';

const CopyInput = (props) => {
  const { value, label, help } = props;
  return (
    <div className={classnames('copy-input', styles)}>
      <Text
        label={label}
        help={help}
        disabled
        value={value}
      />
      <button
        className='copy'
        onClick={() => copy(value)}
      >
        <FontAwesomeIcon icon={faCopy} />
      </button>
    </div>
  );
};

export default CopyInput;
