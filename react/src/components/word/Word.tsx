import * as React from 'react';
import { connect } from 'react-redux';
import { letterPressedAction } from '../../redux/actions';
import { State } from '../../redux/reducers';
import { gameState } from '../../redux/reducers/game';
import './Word.scss';

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
const Word: React.FunctionComponent<IProps> = props => {
    return (
        <>
            <div className="app-word">
                {
                    props.game.word.split('').map((letter, index) => {
                        const isLetterInIneraction = props.game.interaction.includes(letter);
                        return (<span key={`${letter}-${index}`} className={isLetterInIneraction ? 'blank' : 'letter'}>{ isLetterInIneraction ? letter : '-' }</span>)
                    })
                }
            </div>
        </>
    )
};
  
// Reduc connector to create high order component with store integration
const WordContainer = connect(mapStateToProps, mapDispatchToProps)(Word);

export default WordContainer;