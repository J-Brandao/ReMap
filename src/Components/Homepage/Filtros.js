import React, {useState, useEffect} from 'react';
import '../../Styles/Homepage.css';
import FiltrosFechado from '../../Images/BotaoFiltros.svg';
import FiltrosAtivo from '../../Images/BotaoFiltrosAtivo.svg';

function Filtros () {

    const [filtros, setFiltros] = useState('Fechado');

    const abreFiltros = id => {        
        setFiltros(id);
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
                        <p className="mb-0">Menu Filtrar</p>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro"/>
                            <p className="mb-0">Favoritos</p>
                        </span>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro"/>
                            <p className="mb-0">Próximidade</p>
                        </span>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro"/>
                            <p className="mb-0">Perigoso</p>
                        </span>
                        <span className="linhaFiltro">
                            <input type="checkbox" className="inputFiltro"/>
                            <p className="mb-0">Fotogénico</p>
                        </span>
                    </div>
                </span>
            }
        </>
    )
}

export default Filtros;