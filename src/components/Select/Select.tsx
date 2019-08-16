import React from 'react';
import InputLabel from '../InputLabel/InputLabel';
import './Select.css';

// Could extend to support different values,
// but we're only expecting string for now.
type SelectValue = string;

type SelectOption = {
  text: string,
  value: SelectValue,
};

interface Props {
  options: SelectOption[],
  selectedValue: SelectValue,
  onChange?: (value: SelectValue) => void,
  label?: string,
}

class Select extends React.Component<Props> {
  onChange = (event: { target: { value: string } }) => {
    const { value } = event.target;
    const { onChange } = this.props;
    if (!onChange) return;

    onChange(value);
  }

  renderLabel() {
    const { label } = this.props;
    if (!label) return null;

    return (
      <InputLabel>{label}</InputLabel>
    );
  }

  render() {
    const { options, selectedValue } = this.props;
    const optionEls = options.map((option: SelectOption) => (
      <option
        key={`search-option-${option.value}`}
        value={option.value}
      >
        {option.text}
      </option>
    ));

    return (
      <React.Fragment>
        {this.renderLabel()}
        <select
          className="pillar-select"
          value={selectedValue}
          onChange={this.onChange}
        >
          {optionEls}
        </select>
      </React.Fragment>
    );
  }
}

export default Select;
