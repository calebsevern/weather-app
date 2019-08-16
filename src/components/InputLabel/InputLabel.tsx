import React from 'react';
import './InputLabel.css';

interface Props {
  children: any
}

class InputLabel extends React.Component<Props> {
  render() {
    return (
      <div className="pillar-input-label">
        {this.props.children}
      </div>
    );
  }
}

export default InputLabel;
