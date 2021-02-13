import React from 'react';
import '../../Styles/Mapeadores.css';

const Pesquisa = ({search}) => {

    //const atualiza = (event) => {
        //search(event.target.value);
    //}

    //Falta onChange={atualiza}

    return(
        <input className="form-control pesquisa mb-1" type="text" placeholder="Procurar" aria-label="Search"/>
    )
}

export default Pesquisa;