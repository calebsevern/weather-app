import React from 'react';
import InputLabel from '../InputLabel/InputLabel';
import './TextInput.css';

interface Props {
  onChange: (value: string) => void,
  value: string,
  label?: string,
  placeholder?: string,
}

class TextInput extends React.Component<Props> {
  onChange = (event: { target: { value: string } }) => {
    const { onChange } = this.props;
    const { value } = event.target;
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
    const { placeholder, value } = this.props;

    return (
      <React.Fragment>
        {this.renderLabel()}
        <input
          className="pillar-text-input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}

export default TextInput;
