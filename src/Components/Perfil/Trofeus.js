import React from 'react';
import '../../Styles/Perfil.css';
import Camera from '../../Images/Camera.svg';
import Bandeira from '../../Images/Bandeira.svg';
import Trofeu1 from '../../Images/Trofeu1.svg';
import Trofeu2 from '../../Images/Trofeu2.svg';
import Trofeu3 from '../../Images/Trofeu3.svg';
import Trofeu4 from '../../Images/Trofeu4.svg';

function trofeus ({nivel}) {
    return(
        <section className="row col-12 text-center m-0 p-0">
            <span className="col-4 m-0 p-0">
                <img src={Bandeira} className="m-0"/>
                <p className="nomeTrofeu">Explorador</p>
            </span>
            <span className="col-4 m-0 p-0">
                <img src={nivel < 10 ? Trofeu1 : nivel >= 10 && nivel < 24 ? Trofeu2 : nivel >= 25 && nivel < 50 ? Trofeu3 : Trofeu4} className="m-0" style={{height: "70px", width: "auto"}}/>
                <p className="nomeTrofeu">Principiante</p>
            </span>
            <span className="col-4 m-0 p-0">
                <img src={Camera} className="m-0"/>
                <p className="nomeTrofeu">Fotografo</p>
            </span>
        </section>
    )
}

export default trofeus