import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import EdificiosReducer from './Edificios/Reducers';
import UtilizadoresReducer from './Utilizadores/Reducers';
import FriendsReducer from './Friends/Reducers';
import ComentariosReducer from './Comentarios/Reducers'
import tokenReducer from './Token/Reducers';
import SugestoesReducer from './Sugestoes/Reducers';
import EquipasReducer from './Equipas/Reducers';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    Edificios: EdificiosReducer,
    Utilizadores: UtilizadoresReducer,
    Friends: FriendsReducer,
    Comentarios: ComentariosReducer,
    Sugestoes: SugestoesReducer,
    Equipas: EquipasReducer,
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