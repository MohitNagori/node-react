import * as React from 'react';
import { connect } from 'react-redux';
import { gameStartAction, timerRestart } from '../../redux/actions';
import { State } from '../../redux/reducers';
import { gameState } from '../../redux/reducers/game';
import RefreshIcon from '../../assets/icons/refresh.svg';
import './GameHeader.scss';

// Props interface
interface IProps {
    onRequestNewGame: () => void;
    game: gameState;
}

// Bind state to Props
const mapStateToProps = (state: State) => ({
    game: state.game
})

// Actions bind to props
const mapDispatchToProps = (dispatch: any) => ({
    onRequestNewGame: () => {
        dispatch(gameStartAction());
        dispatch(timerRestart());
    },
});

// Component
const Timer: React.FunctionComponent<IProps> = props => {
    return (
        <>  
            <div className="app-gameheader">
                <div className="app-timer">{props.game.timer}</div>
                <div className="app-refresher">
                    {
                        props.game.progress && <img src={RefreshIcon} alt="refresh" 
                            className="app-icon" onClick={props.onRequestNewGame}/>
                    }
                </div>                
            </div>
        </>
    )
};
  
// Reduc connector to create high order component with store integration
const TimerContainer = connect(mapStateToProps, mapDispatchToProps)(Timer);

export default TimerContainer;