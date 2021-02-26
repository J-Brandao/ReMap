import React, {useState, useEffect} from 'react';
import '../../Styles/Homepage.css';
import ArrowMenu from '../../Images/ArrowMenu.svg';
import MenuComunidade from '../../Images/MenuComunidade.svg';
import MenuEdificio from '../../Images/MenuEdificio.svg';
import MenuGamehub from '../../Images/MenuGamehub.svg';
import { Link, useHistory } from 'react-router-dom';

function Menu (props) {

    const [menu, setMenu] = useState('Fechado');

    const abreMenu = id => {        
        setMenu(id);
    }

    return(
        <div className={`menu ${menu === "Aberto" ? "Aberto" : "Fechado"}`} onClick={menu === "Aberto" ? () => abreMenu('Fechado') : () => abreMenu('Aberto') }>
                {
                    menu === 'Fechado' ?
                        <img src={ArrowMenu} className="setaMenu"/>
                        :
                        <img src={ArrowMenu} className="setaMenu2"/>
                }
                <Link to="/mapeadores">
                    <img src={MenuComunidade} className="imagemMenu"/>
                </Link>
                <Link
                    to={{
                        pathname:'/novo',
                        state: {
                            localizacao: [props.coordenadas.lat, props.coordenadas.long]
                        }
                    }}>
                    <img src={MenuEdificio} className="imagemMenu"/>
                </Link>
                <Link to="/gamehub">
                    <img src={MenuGamehub} className="imagemMenu"/>
                </Link>
            </div>
    )
}

export default Menu;