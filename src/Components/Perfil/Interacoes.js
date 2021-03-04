import React, {useState, useEffect} from 'react';
import '../../Styles/Perfil.css';
import DetalhesSeccao from './DetalhesSeccao';
import Comentarios from '../../Images/Comentarios.svg';
import ComentariosSelected from '../../Images/ComentariosSelected.svg';
import Edificios from '../../Images/Edificios.svg';
import EdificiosSelected from '../../Images/EdificiosSelected.svg';
import Fotografias from '../../Images/Fotografias.svg';
import FotografiasSelected from '../../Images/FotografiasSelected.svg';
import Ideias from '../../Images/Ideias.svg';
import IdeiasSelected from '../../Images/IdeiasSelected.svg';
import { useDispatch, useSelector } from "react-redux";
import { getSugestoesListByUser } from "../../Store/Sugestoes/Actions";
import { getComentariosListByUser } from "../../Store/Comentarios/Actions";
import { getEdificioPerfil } from '../../Store/Edificios/Actions';



function Interacoes ({userId, urlId}) {

    const [seccao, setSeccao] = useState('Edifícios Adicionados');
    const [verifica, setVerifica] = useState(false);
    const dispatch = useDispatch()
    const isLoadingComment = useSelector(({ Comentarios }) => Comentarios.isLoading)
    const commentData = useSelector(({ Comentarios }) => Comentarios.data)
    const sugestoes = useSelector(({ Sugestoes }) => Sugestoes.data);
    const isLoadingSugestoes = useSelector(({Sugestoes})=> Sugestoes.isLoading);
    const EdificioList = useSelector(({ Edificios }) => Edificios.data);
    const isLoadingEdificio = useSelector(({ Edificios }) => Edificios.isLoading);
    
    useEffect(() => {
        
        if(userId == urlId){
            dispatch(getComentariosListByUser(userId));
            dispatch(getSugestoesListByUser(userId));
            dispatch(getEdificioPerfil(userId));
        } else {
            setVerifica(!verifica);
        }
    }, [verifica])

    const MudaSeccao = id => {
        setSeccao(id);
    }

    if (isLoadingSugestoes || isLoadingComment || isLoadingEdificio) {
        return null;
    }

    return(
        <>
        <section className="row col-12 m-0 p-0">
         
            <h5 className="col-12 p-0 mb-3" id="seccaoTitulo">As minhas interações</h5>
            <span onClick = {() => MudaSeccao('Edifícios Adicionados')} className="col-4 m-0 p-0 text-center">
                {seccao === 'Edifícios Adicionados' ?
                <img src={EdificiosSelected} className="m-0"/>
                :
                <img src={Edificios} className="m-0"/>
                }
            </span>
            <span onClick = {() => MudaSeccao('Sugestões')} className="col-4 m-0 p-0 text-center">
                {seccao === 'Sugestões' ?
                <img src={IdeiasSelected} className="m-0"/>
                :
                <img src={Ideias} className="m-0"/>
                }
            </span>
            <span onClick = {() => MudaSeccao('Comentários')} className="col-4 m-0 p-0 text-center">
                {seccao === 'Comentários' ?
                <img src={ComentariosSelected} className="m-0"/>
                :
                <img src={Comentarios} className="m-0"/>
                }
            </span>
        </section>
        <section className="row col-12 m-0 p-0">
            <h5 className="col-12 p-0 mb-3 mt-3" id="seccaoTitulo">{seccao}</h5>
                <DetalhesSeccao tipo={seccao} edificios={EdificioList} sugestoes={sugestoes} comentarios={commentData}/>
        </section>
        </>
    )
}

export default Interacoes