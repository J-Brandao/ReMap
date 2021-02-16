import React from 'react';
import styled from 'styled-components';
import Back from '../Images/BackArrow.svg';
import '../Styles/AdicionarEdificio.css';
import AdicionarImagem from '../Images/GaleriaImagens.svg'
import BackArrow from '../Components/Geral/BackArrow'

const Div = styled.div`
    margin: 40px 30px 40px 30px;
`;

function AdicionarEdificio () {
    return(
        <Div>
            <section className="row col-12 m-0 p-0">
                <BackArrow />
                <span className="col-9 tituloPagina offset-2 text-center m-0 p-0">
                    Adicionar novo edifício
                </span>
            </section>
            <section className="row col-12 m-0 p-0">
                <form className="col-12 w-0 p-0">
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Identificação do edifício</span>
                        <input className="form-control forms mb-3" type="text" aria-label="Search"/>
                    </span>
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Descrição do edifício</span>
                        <textarea className="form-control forms mb-3" rows="4" type="text" aria-label="Search"/>
                    </span>
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Galeria de fotos</span>
                        <label for="galeriaImgs" className="seccaoTitulo formsImagem mb-3"><img src={AdicionarImagem} className="mb-0"/></label>
                        <input className="form-control" id="galeriaImgs" type="file" aria-label="Search"/>
                    </span>
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Localização do edifício</span>
                        <input className="form-control forms mb-3" type="text" aria-label="Search"/>
                    </span>
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Estado do edifício</span>
                        <input className="form-control forms mb-3" type="text" aria-label="Search"/>
                    </span>
                </form>
            </section>
        </Div>
    )
}

export default AdicionarEdificio