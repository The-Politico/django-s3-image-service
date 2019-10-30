import React from 'react';

import { Select as SketchSelect } from '@politico/interactive-style-sketch';

class Select extends React.PureComponent {
  onChange = e => {
    this.props.onChange(e.target.value);
  }

  render() {
    const options = this.props.options.enumOptions.map(o => ({
      id: o.value,
      label: o.label,
    }));
    const value = this.props.value;

    return (
      <SketchSelect
        error={null}
        options={options}
        value={value}
        placeholder='Choose an option'
        onChange={this.onChange}
      />
    );
  }
}

export default Select;
