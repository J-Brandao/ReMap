import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Back from '../Images/BackArrow.svg';
import '../Styles/AdicionarEdificio.css';
import AdicionarImagem from '../Images/GaleriaImagens.svg'
import BackArrow from '../Components/Geral/BackArrow';
import { set } from 'lodash';


const Div = styled.div`
    margin: 40px 30px 40px 30px;
`;

function AdicionarEdificio () {

    const [valores, setValores] = useState({
        nomeEdificio: '',
        descricao: '',
        fotos: '',
        localizacao: [],
        degradacao: '5',
        acesso: '5',
        seguranca: '5',
        vandalismo: '5'
    })

    const handleChange = tipo => conteudo => {
        valores[tipo] = conteudo.target.value;
        setValores({...valores});
    }

    return(
        <Div>
            <section className="row col-12 m-0 p-0">
                <BackArrow />
                <span className="col-9 tituloPagina offset-2 text-center m-0 p-0">
                    Adicionar novo edifício
                </span>
            </section>
            {console.log(valores)}
            <section className="row col-12 m-0 p-0">
                <form className="col-12 w-0 p-0">
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Identificação do edifício</span>
                        <input 
                            className="form-control forms mb-3" 
                            type="text" aria-label="Search" 
                            onChange={handleChange('nomeEdificio')}/>
                    </span>
                    <span className="col-12 m-0 p-0">
                        <span className="seccaoTitulo">Descrição do edifício</span>
                        <textarea 
                            className="form-control forms mb-3" 
                            rows="4" 
                            type="text" 
                            aria-label="Search" 
                            onChange={handleChange('descricao')}/>
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
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Degradação</span>
                            <input className="bar mb-2 w-100" type="range" min="0" max="5" step="1" aria-label="Search" onChange={handleChange('degradacao')}/>
                        </div>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Acesso</span>
                            <input className="mb-2 w-100" type="range" min="0" max="5" step="1" aria-label="Search" onChange={handleChange('acesso')}/>
                        </div>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Segurança</span>
                            <input className="mb-2 w-100" type="range" min="0" max="5" step="1" aria-label="Search" onChange={handleChange('seguranca')}/>
                        </div>
                        <div className="m-0 p-0">
                            <span className="nomeBarra">Vandalismo</span>
                            <input className="mb-2 w-100" type="range" min="0" max="5" step="1" aria-label="Search" onChange={handleChange('vandalismo')}/>
                        </div>
                    </span>
                </form>
            </section>
        </Div>
    )
}

export default AdicionarEdificio