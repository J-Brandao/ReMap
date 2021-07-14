import React from 'react';
import '../../Styles/Perfil.css';
import Camera from '../../Images/Camera.svg';
import Bandeira from '../../Images/Bandeira.svg';
import Trofeu1 from '../../Images/Trofeu1.svg';
import Trofeu2 from '../../Images/Trofeu2.svg';
import Trofeu3 from '../../Images/Trofeu3.svg';
import Trofeu4 from '../../Images/Trofeu4.svg';

import badgeSugestao_0 from '../../Images/badges/badgeSugestao_0.svg';
import badgeSugestao_1 from '../../Images/badges/badgeSugestao_1.svg';
import badgeSugestao_2 from '../../Images/badges/badgeSugestao_2.svg';
import badgeSugestao_3 from '../../Images/badges/badgeSugestao_3.svg';

import badgeEdificio_0 from '../../Images/badges/badgeEdificio_0.svg';
import badgeEdificio_1 from '../../Images/badges/badgeEdificio_1.svg';
import badgeEdificio_2 from '../../Images/badges/badgeEdificio_2.svg';
import badgeEdificio_3 from '../../Images/badges/badgeEdificio_3.svg';

function trofeus({ utilizador }) {
    const nivel = utilizador.progresso.nivel;
    return(
        <section className="row col-12 text-center m-0 p-0">
            <span className="col-4 m-0 p-0">
            <img className="m-0 imgCracha" src={
                                utilizador.progresso.edificios.badge === "badgeEdificio_0.svg" ?
                                badgeEdificio_0
                                :
                                utilizador.progresso.edificios.badge === "badgeEdificio_1.svg" ?
                                badgeEdificio_1
                                :
                                utilizador.progresso.edificios.badge === "badgeEdificio_2.svg" ?
                                badgeEdificio_2
                                :
                                badgeEdificio_3
                            }/>
                <p className="nomeTrofeu">Mapeador</p>
            </span>
            <span className="col-4 m-0 p-0">
            <img src={nivel < 10 ? Trofeu1 : nivel >= 10 && nivel < 24 ? Trofeu2 : nivel >= 25 && nivel < 50 ? Trofeu3 : Trofeu4} className="m-0" style={{height: "70px", width: "auto"}}/>
                <p className="nomeTrofeu">Principiante</p>
            </span>
            <span className="col-4 m-0 p-0">
            <img className="m-0 imgCracha" src={
                                utilizador.progresso.sugestao.badge === "badgeSugestao_0.svg" ?
                                badgeSugestao_0
                                :
                                utilizador.progresso.sugestao.badge === "badgeSugestao_1.svg" ?
                                badgeSugestao_1
                                :
                                utilizador.progresso.sugestao.badge === "badgeSugestao_2.svg" ?
                                badgeSugestao_2
                                :
                                badgeSugestao_3
                            }/>
                <p className="nomeTrofeu">Banco de Ideias</p>
            </span>
        </section>
    )
}

export default trofeus