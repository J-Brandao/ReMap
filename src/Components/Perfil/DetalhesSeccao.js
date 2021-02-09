import React, {useState, useEffect} from 'react';
import '../../Styles/Perfil.css';

function DetalhesSeccao (props) {

    return(
        <div className="m-0 p-0">
            {props.tipo === 'Edifícios Adicionados' ?
            "Edificios"
            :
            props.tipo === 'Sugestões' ?
            <>
            <span className="col-3">
                Sugestões
            </span>
            <span className="col-9">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </span>
            </>
            :
            props.tipo === 'Fotografias' ?
            "Fotografias"
            :
            "Comentários"
            }
        </div> 
    )
}

export default DetalhesSeccao