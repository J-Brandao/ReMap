import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import EdificiosReducer from './Edificios/Reducers';
import UtilizadoresReducer from './Utilizadores/Reducers';
import FriendsReducer from './Friends/Reducers';
import tokenReducer from './Token/Reducers';
import SugestoesReducer from './Sugestoes/Reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    Edificios: EdificiosReducer,
    Utilizadores: UtilizadoresReducer,
    Friends: FriendsReducer,
    Sugestoes: SugestoesReducer,
    token: tokenReducer
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);