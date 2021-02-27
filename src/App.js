import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Perfil from './Pages/Perfil';
import Gamehub from './Pages/Gamehub';
import PaginaEdificio from './Pages/PaginaEdificio';
import Mapeadores from './Pages/Mapeadores';
import MapeadoresCom from './Pages/MapeadoresCom';
import MapeadoresFriends from './Pages/MapeadoresFriends';
import AdicionarEdificio from './Pages/AdicionarEdificio';
import Homepage from './Pages/Homepage';
import EditarUtilizador from './Pages/EditarUtilizador';
import FinalizarUtilizador from './Pages/FinalizarUtilizador';
import PerfilOutros from './Pages/PerfilOutros';
import './Styles/Geral.css';
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Auth0Provider
      domain="dev-x782vrhf.eu.auth0.com"
      clientId="nDVdfkS2EEi46sFaDQ6mBIbrFHhmsl7X"
      redirectUri={"http://localhost:3000/homepage"}//A ALTERAR
      audience='https://dev-x782vrhf.eu.auth0.com/api/v2/'
    >
      <Router>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/perfil" component={Perfil}/>
        <Route exact path="/gamehub" component={Gamehub}/>
        <Route exact path="/edificio/:id" component={PaginaEdificio}/>
          <Route exact path="/mapeadores" component={Mapeadores} />
          <Route exact path="/mapeadores/amigos" component={MapeadoresFriends} />
          <Route exact path="/mapeadores/comunidade" component={MapeadoresCom} />
        <Route exact path="/novo" component={AdicionarEdificio}/>
        <Route exact path="/homepage" component={Homepage}/>
        <Route exact path="/editar" component={EditarUtilizador} />
        <Route exact path="/finalizar" component={FinalizarUtilizador} />
        <Route exact path="/mapeador/:id" component={PerfilOutros}/>
      </Switch>
    </Router>
    </Auth0Provider>
    
  );
}

export default App;
