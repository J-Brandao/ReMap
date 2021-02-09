import React, {useState, useEffect} from 'react';
import '../../Styles/Perfil.css';
import DetalhesSeccao from './DetalhesSeccao';
import Comentarios from '../../Images/Comentarios.png';
import ComentariosSelected from '../../Images/ComentariosSelected.png';
import Edificios from '../../Images/Edificios.png';
import EdificiosSelected from '../../Images/EdificiosSelected.png';
import Fotografias from '../../Images/Fotografias.png';
import FotografiasSelected from '../../Images/FotografiasSelected.png';
import Ideias from '../../Images/Ideias.png';
import IdeiasSelected from '../../Images/IdeiasSelected.png';

function Interacoes () {

    const [seccao, setSeccao] = useState('Edifícios Adicionados');

    const MudaSeccao = id => {
        setSeccao(id);
    }

    return(
        <>
        <section className="row col-12 m-0 p-0">
            <h5 className="col-12 p-0 mb-3" id="seccaoTitulo">As minhas interações</h5>
            <span onClick = {() => MudaSeccao('Edifícios Adicionados')} className="col-3 m-0 p-0">
                {seccao === 'Edifícios Adicionados' ?
                <img src={EdificiosSelected} className="m-0"/>
                :
                <img src={Edificios} className="m-0"/>
                }
            </span>
            <span onClick = {() => MudaSeccao('Sugestões')} className="col-3 m-0 p-0">
                {seccao === 'Sugestões' ?
                <img src={IdeiasSelected} className="m-0"/>
                :
                <img src={Ideias} className="m-0"/>
                }
            </span>
            <span onClick = {() => MudaSeccao('Fotografias')} className="col-3 m-0 p-0">
                {seccao === 'Fotografias' ?
                <img src={FotografiasSelected} className="m-0"/>
                :
                <img src={Fotografias} className="m-0"/>
                }
            </span>
            <span onClick = {() => MudaSeccao('Comentários')} className="col-3 m-0 p-0">
                {seccao === 'Comentários' ?
                <img src={ComentariosSelected} className="m-0"/>
                :
                <img src={Comentarios} className="m-0"/>
                }
            </span>
        </section>
        <section className="row col-12 m-0 p-0">
            <h5 className="col-12 p-0 mb-3 mt-3" id="seccaoTitulo">{seccao}</h5>
            <DetalhesSeccao tipo={seccao}/>
        </section>
        </>
    )
}

export default Interacoes