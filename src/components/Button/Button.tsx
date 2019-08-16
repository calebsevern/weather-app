import React from 'react';
import './Button.css';

interface Props {
  children: any
  onClick?: () => void
}

class Button extends React.Component<Props> {
  render() {
    const { onClick } = this.props;

    return (
      <button
        className="pillar-button"
        onClick={onClick}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;
