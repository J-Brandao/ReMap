import React from 'react';
import '../../Styles/Perfil.css';
import Camera from '../../Images/Camera.png';
import Bandeira from '../../Images/Bandeira.png';
import Trofeu from '../../Images/Trofeu.png';

function trofeus () {
    return(
        <section className="row col-12 text-center m-0 p-0">
            <span className="col-4 m-0 p-0">
                <img src={Bandeira} className="m-0"/>
                <p className="nomeTrofeu">Explorador</p>
            </span>
            <span className="col-4 m-0 p-0">
                <img src={Trofeu} className="m-0"/>
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