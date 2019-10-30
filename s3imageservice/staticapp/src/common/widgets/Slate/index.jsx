import React from 'react';

import throttle from 'lodash/throttle';
import Editor from 'slate-politico-editor';
import getContentByName from 'Common/utils/getContentByName';
import classnames from 'classnames';

import { Value } from 'slate';

import { styles } from './styles.scss';

const SERVICES_TOKEN = getContentByName('SERVICES_TOKEN');

const DEFAULT_VALUE = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [{
          object: 'text',
          leaves: [{
            text: '',
            object: 'leaf',
          }],
        }],
      },
    ],
  },
};

class Slate extends React.Component {
  constructor(props) {
    super(props);
    const initialValue = props.value ? Value.fromJSON(props.value) : Value.fromJSON(DEFAULT_VALUE);
    this.state = { value: initialValue };
  }

  onChangeCallback = throttle((currentValue, newValue) => {
    const currentValueSerialized = JSON.stringify(currentValue.toJSON());
    const newValueSerialized = JSON.stringify(newValue.toJSON());

    const trueChange = currentValueSerialized !== newValueSerialized;
    if (trueChange) {
      this.props.onChange(newValueSerialized);
    }
  }, 1000)

  onChange = ({ value }) => {
    this.onChangeCallback(this.state.value, value);
    this.setState(
      { value }
    );
  }

  componentDidMount() {
    const newValueSerialized = JSON.stringify(this.state.value.toJSON());

    // weird race condidtion requires this to be in a timeout
    setTimeout(() => {
      this.props.onChange(newValueSerialized);
    }, 1);
  }

  render() {
    const { placeholder } = this.props;

    return (
      <div className={classnames('slate-editor-container', styles)}>
        <Editor
          value={this.state.value}
          placeholder={placeholder}
          onChange={this.onChange}
          oembedAPI={'https://politicoapps.com/services/api/oembed/'}
          imageAPI={'https://politicoapps.com/services/api/s3imageservice/'}
          authorization={`Token ${SERVICES_TOKEN}`}
        />
      </div>
    );
  }
}

export default Slate;
