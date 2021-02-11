import React from 'react';
import '../../Styles/PaginaEdificio.css';
import {ProgressBar} from 'react-bootstrap';

function Classificacao() {
    return(
        <section className="row col-12 m-0 mt-3 p-0">
            <h5 id="seccaoTitulo">Classificação do edifício</h5>
            <span className="m-0 p-0 w-100">
                <p className="tipoClass">Acesso</p>
                <ProgressBar now={60} variant="custom"/>
            </span>
            <span className="m-0 mt-1 p-0 w-100">
                <p className="tipoClass">Segurança</p>
                <ProgressBar now={60} variant="custom"/>
            </span>
            <span className="m-0 mt-1 p-0 w-100">
                <p className="tipoClass">Vandalismo</p>
                <ProgressBar now={60} variant="custom"/>
            </span>

            <style>
                {`
                .progress {
                    background-color: white;
                    height: 19px;
                    border: #c4c4c4 solid 2px;
                    border-radius: 0;
                    width: 100%;
                  }
                  
                  .bg-custom {
                    background-color: #ffa801;
                    color: white;
                  }
                `}
            </style>
        </section>
    )
}

export default Classificacao