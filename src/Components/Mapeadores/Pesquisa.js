import React from 'react';
import '../../Styles/Mapeadores.css';

function Pesquisa ({search, onChange, value}) {

    //const atualiza = (event) => {
        //search(event.target.value);
    //}

    //Falta onChange={atualiza}
    const _onChange = (e) => {
        onChange(e)
    }

    return(
        <input className="form-control pesquisa mb-1" type="text" placeholder="Procurar" value={value} onChange={_onChange} aria-label="Search"/>
    )
}

export default Pesquisa;