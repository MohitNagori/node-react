import * as React from 'react';
import { connect } from 'react-redux';
import { genCharArray } from '../../utils/helper';
import { letterPressedAction, timerRestart } from '../../redux/actions';
import { State } from '../../redux/reducers';
import { gameState } from '../../redux/reducers/game';
import './Keyboard.scss';
import KeyboardKey from '../keyboard-key/KeyboardKey';

// Props interface
interface IProps {
  onLetterPressed: (letter: string) => void;
  game: gameState;
}

interface IState {
  letters: string[];
}

// Bind state to Props
const mapStateToProps = (state: State) => ({
  game: state.game
})

// Actions bind to props
const mapDispatchToProps = (dispatch: any) => ({
  onLetterPressed: (letter: string) => {
    dispatch(letterPressedAction(letter))
    dispatch(timerRestart());
  },
});

// Component
class Keyboard extends React.Component<IProps, IState> {
  
  constructor(props: IProps) {
    super(props);
    this.state = {
      letters: genCharArray("A", "Z")
    }
  }

  onLetterPressed = (letter: string) => {
    if (this.props.game.attempt && this.props.game.timer) {
      this.props.onLetterPressed(letter)
    }
  }

  render() {
    return (
      <>
        <div className="app-keyboard">
          {
            this.state.letters.map((letter: string) => (
              <KeyboardKey
                key={letter}
                selected={this.props.game.interaction.includes(letter)}
                disabled={!this.props.game.word || !this.props.game.attempt}
                letter={letter} 
                letterPressed={() => this.onLetterPressed(letter)}></KeyboardKey>
            ))
          }
        </div>
      </>
    )
  }
};
  
// Redux connector to create high order component with store integration
const KeyboardContainer = connect(mapStateToProps, mapDispatchToProps)(Keyboard);

export default KeyboardContainer;