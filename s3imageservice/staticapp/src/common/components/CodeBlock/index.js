import React from 'react';
import classnames from 'classnames';
import Refractor from 'react-refractor';
import json from 'refractor/lang/json';

import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import 'prismjs/themes/prism-solarizedlight.css';
import { styles } from './styles.scss';

Refractor.registerLanguage(json);

class CodeBlock extends React.Component {
  render() {
    const { value } = this.props;
    return (
      <div className={classnames('code-block', styles)}>
        <Refractor
          language={'json'}
          value={value}
        />
        <button
          className='copy'
          onClick={() => copy(this.props.value)}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </div>
    );
  }
}

export default CodeBlock;
