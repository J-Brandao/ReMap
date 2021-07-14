import React, {useState, useEffect} from 'react';
import '../../Styles/Homepage.css';
import FiltrosFechado from '../../Images/BotaoFiltros.svg';
import FiltrosAtivo from '../../Images/BotaoFiltrosAtivo.svg';

function Filtros ({filtro, valorFiltro}) {

    const [filtros, setFiltros] = useState('Fechado');

    const abreFiltros = id => {        
        setFiltros(id);
    }

    const atualiza = (tipo, valor) => {
        filtro(tipo, valor);
    }

    return(
        <>
            {
            filtros === 'Fechado' ?
                <img className="filtrosImagem" src={FiltrosFechado} onClick={() => abreFiltros('Aberto')}/>
                :
                <span>
                    <img className="filtrosImagem" src={FiltrosAtivo} onClick={() => abreFiltros('Fechado')}/>
                    {valorFiltro === 0 ?
                    <div className="filtrosAberto">
                        <p className="mb-0">Filtar por Distância</p>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade', 0.05)}/>
                            <p className="mb-0"> 0-5km</p>
                        </span>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade', 0.15)}/>
                            <p className="mb-0">0-15km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade', 0.25)}/>
                            <p className="mb-0">0-25km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade', 0.5)}/>
                            <p className="mb-0">0-50km</p>
                        </span>
                    </div>
                    :
                    valorFiltro === 0.05 ?
                    <div className="filtrosAberto">
                        <p className="mb-0">Filtar por Distância</p>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade', 0.05)}/>
                            <p className="mb-0">0-5km</p>
                        </span>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">6-15km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">16-25km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">26-50km</p>
                        </span>
                    </div>
                    :
                    valorFiltro === 0.15 ?
                    <div className="filtrosAberto">
                        <p className="mb-0">Filtar por Distância</p>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">0-5km</p>
                        </span>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade', 0.15)}/>
                            <p className="mb-0">6-15km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">16-25km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">26-50km</p>
                        </span>
                    </div>
                    :
                    valorFiltro === 0.25 ?
                    <div className="filtrosAberto">
                        <p className="mb-0">Filtar por Distância</p>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">0-5km</p>
                        </span>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">6-15km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade', 0.25)}/>
                            <p className="mb-0">16-25km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">26-50km</p>
                        </span>
                    </div>
                    :
                    <div className="filtrosAberto">
                        <p className="mb-0">Filtar por Distância</p>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">0-5km</p>
                        </span>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">6-15km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" disabled/>
                            <p className="mb-0">16-25km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade', 0.5)}/>
                            <p className="mb-0">26-50km</p>
                        </span>
                    </div>
                    }
                </span>
            }
        </>
    )
}

export default Filtros;