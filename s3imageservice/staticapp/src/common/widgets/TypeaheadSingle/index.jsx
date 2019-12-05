import React from 'react';

import { Typeahead } from '@politico/interactive-style-sketch';

class TypeaheadSingle extends React.PureComponent {
  idToChoice = id => {
    const options = this.props.options.enumOptions;
    return options.filter(
      option => option.value === id
    );
  }

  choiceToId = choice => {
    const options = this.props.options.enumOptions;

    const selection = options.filter(
      option => choice.map(
        c => c.value
      ).includes(option.value)
    );

    if (selection.length > 0) {
      return selection[0].value;
    } else {
      return undefined;
    }
  }

  onChange = choice => {
    this.props.onChange(this.choiceToId(choice));
  }

  render() {
    const options = this.props.options.enumOptions;
    const { value, placeholder } = this.props;

    return (
      <Typeahead
        options={options}
        value={this.idToChoice(value)}
        placeholder={placeholder}
        onChange={this.onChange}
      />
    );
  }
}

TypeaheadSingle.defaultProps = {
  value: {
    'content': '',
  },
  placeholder: 'Choose an option...',
};

export default TypeaheadSingle;
