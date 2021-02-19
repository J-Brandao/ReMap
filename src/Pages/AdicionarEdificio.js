import React, {useState} from 'react';
import styled from 'styled-components';
import '../Styles/AdicionarEdificio.css';
import { useDispatch } from 'react-redux';
import AdicionarImagem from '../Images/GaleriaImagens.svg'
import BackArrow from '../Components/Geral/BackArrow';
import { createNovoEdificio } from '../Store/Edificios/Actions';


const Div = styled.div`
    margin: 40px 30px 40px 30px;
`;

function AdicionarEdificio (props) {

    const dispatch = useDispatch();
    const [valores, setValores] = useState({
        nomeEdificio: '',
        descricao: '',
        fotos: '',
        localizacao: props.location.state.localizacao,
        degradacao: '5',
        acesso: '5',
        seguranca: '5',
        vandalismo: '5'
    });

    const handleChange = tipo => conteudo => {
        valores[tipo] = conteudo.target.value;
        setValores({...valores});
    };

    const onCreateFavEdificio = (nomeEdificio, descricao, localizacao, degradacao, acesso, seguranca, vandalismo) => 
        dispatch(createNovoEdificio(nomeEdificio, descricao, localizacao, degradacao, acesso, seguranca, vandalismo))

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
                <span className="col-12 text-right m-0 p-0">
                    {valores.nomeEdificio !== '' && valores.descricao !== '' && valores.localizacao !== '' ?
                        <button 
                            className="botaoSubmeter mt-4" 
                            onClick={() => onCreateFavEdificio(valores.nomeEdificio, valores.descricao, valores.localizacao, valores.degradacao, valores.acesso, valores.seguranca, valores.vandalismo)}
                            >Submeter</button>
                        :
                        <button 
                            className="botaoSubmeterDisabled mt-4" 
                            disabled
                            >Submeter</button>
                    }
                </span>
            </section>
        </Div>
    )
}

export default AdicionarEdificio