import * as React from 'react';
import { connect } from 'react-redux';
import { CONSTANTS } from '../../utils/constants';
import { letterPressedAction } from '../../redux/actions';
import { State } from '../../redux/reducers';
import { gameState } from '../../redux/reducers/game';
import './Hangman.scss';

// Props interface
interface IProps {
    onLetterPressed: (letter: string) => void;
    game: gameState;
}

// Bind state to Props
const mapStateToProps = (state: State) => ({
    game: state.game
})

// Actions bind to props
const mapDispatchToProps = (dispatch: any) => ({
  onLetterPressed: (letter: string) => dispatch(letterPressedAction(letter)),
});

// Component
const Hangman: React.FunctionComponent<IProps> = props => {
    const [maxAttempts] = React.useState(CONSTANTS.MAX_ATTEMPTS);

    return (
        <>
            <div className="app-hangman">
                <p></p>
                {
                    Array.from(Array(maxAttempts).keys()).reverse()
                        .map(x => (<span key={`hungman-${x}`} className={x >= props.game.attempt && props.game.progress ? 'selected' : ''}></span>))
                }
                <span className={!props.game.attempt && props.game.progress ? 'selected' : ''}></span>
                <hr/>
            </div>
           
        </>
    )
};
  
// Reduc connector to create high order component with store integration
const HangmanContainer = connect(mapStateToProps, mapDispatchToProps)(Hangman);

export default HangmanContainer;