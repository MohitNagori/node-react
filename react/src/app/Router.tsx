
import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import List from '../routes/list/List';
import Game from '../routes/game/Game';

// Props interface
interface IProps {}

// Component
const AppRouter: React.FunctionComponent<IProps> = props => {
    const [routes] = React.useState([
        { url: '/', title: 'Game', component: <Game /> },
        { url: 'list', title: 'List', component: <List /> }
    ]);

    return (   
        <> 
            <Router>            
                <Switch>
                    { 
                        routes.map((route) => (
                            <Route path={route.url} exact={true} key={route.url}>
                                { route.component }
                            </Route>
                        )) 
                    }
                </Switch>
            </Router>
        </>
    );    
}  

export default AppRouter;