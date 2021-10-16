import * as React from 'react';
import { connect } from 'react-redux';
import { gameStartAction, toggleThemeAction, timerRestart } from '../../redux/actions';
import './Header.scss';
import DayIcon from '../../assets/icons/day.svg';
import NightIcon from '../../assets/icons/night.svg'
import { State } from '../../redux/reducers';
import { gameState } from '../../redux/reducers/game';
import { appState } from '../../redux/reducers/app';

// Props interface
interface IProps {
  onRequestNewGame: () => void;
  onToggleTheme: () => void;
  game: gameState;
  app: appState
}

// Bind state to Props
const mapStateToProps = (state: State) => ({
  game: state.game,
  app: state.app
})


// Actions bind to props
const mapDispatchToProps = (dispatch: any) => ({
  onRequestNewGame: () => {
    dispatch(gameStartAction());
    dispatch(timerRestart());
  },
  onToggleTheme: () => dispatch(toggleThemeAction())
});

// Component
const Header: React.FunctionComponent<IProps> = props => {
  return (
    <>
      <header className="app-header">
        <h1 className="app-title">HangMan</h1>
        {
          !props.game.progress && <button className="app-button" onClick={props.onRequestNewGame}>New Game</button>
        }
        <img src={props.app.theme === 'light' ? NightIcon : DayIcon} alt="theme-toggler" className="app-icon" onClick={props.onToggleTheme}/>
      </header>
    </>
  )
};
  
// Reduc connector to create high order component with store integration
const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;