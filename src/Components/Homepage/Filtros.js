import React, {useState, useEffect} from 'react';
import '../../Styles/Homepage.css';
import FiltrosFechado from '../../Images/BotaoFiltros.svg';
import FiltrosAtivo from '../../Images/BotaoFiltrosAtivo.svg';

function Filtros ({filtro}) {

    const [filtros, setFiltros] = useState('Fechado');

    const abreFiltros = id => {        
        setFiltros(id);
    }

    const atualiza = (tipo) => {
        filtro(tipo);
    }

    return(
        <>
            {
            filtros === 'Fechado' ?
                <img className="filtrosImagem" src={FiltrosFechado} onClick={() => abreFiltros('Aberto')}/>
                :
                <span>
                    <img className="filtrosImagem" src={FiltrosAtivo} onClick={() => abreFiltros('Fechado')}/>
                    <div className="filtrosAberto">
                        <p className="mb-0">Filtar por Distância</p>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro"/>
                            <p className="mb-0">0-5km</p>
                        </span>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade')}/>
                            <p className="mb-0">6-15km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade')}/>
                            <p className="mb-0">16-25km</p>
                        </span>
                        <span className="linhaFiltro">
                        <input type="checkbox" className="inputFiltro" onClick={() => atualiza('proximidade')}/>
                            <p className="mb-0">26-50km</p>
                        </span>
                    </div>
                </span>
            }
        </>
    )
}

export default Filtros;