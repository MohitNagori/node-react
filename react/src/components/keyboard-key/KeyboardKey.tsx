import * as React from 'react';
import { withMouseHover } from '../hoc';
import './KeyboardKey.scss';

// Props interface
interface IProps {
  letterPressed: (letter: string) => void;
  letter: string;
  selected: boolean;
  disabled: boolean;
  isHovered: boolean;
}

// Component
const KeyboardKey: React.FunctionComponent<IProps> = props => {
  
  const onLetterPressed = () => {
    if (props.letterPressed) {
      props.letterPressed(props.letter)
    }
  }

  const getClass = () => {
    let className = 'app-keyboard-key ';
    if (props.selected) {
      className += 'selected';
    } else if (props.disabled) {
      className += 'disabled';
    } else if (props.isHovered) {
      className += 'hovered';
    }

    return className;
  }

  return (
    <span onClick={() => onLetterPressed()} className={getClass()}>
      {props.letter}
    </span>
  )
};

export default withMouseHover(KeyboardKey);