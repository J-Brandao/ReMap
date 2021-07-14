import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import '../../Styles/PaginaEdificio.css';
import Perfil from '../../Images/Perfil.jpg';
import { createNovaSugestao } from '../../Store/Sugestoes/Actions';
import { useDispatch, useSelector } from 'react-redux';
import useAuthentication from '../../Firebase/useAuthentication';
import SingleSugestao from './SingleSugestao'
import CommentLoading from '../Geral/CommentLoading'

const Div = styled.div`
    padding: 20px 30px 10px 30px;
`;

const CommentPicture = styled.div`
      margin: 0 auto;
      background-image: url(${Perfil});
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      border-radius: 50%;
      min-height: 70px;
      width: 70px;
    `; 

function Sugestoes (props) { 

    const utilizador = useSelector(({Utilizadores})=> Utilizadores.ownUser)
    const dispatch = useDispatch();
    const [sugestao, setSugestao] = useState({
        valor: '',
        userId: props.utilizador,
        edificioId: props.edificio.id
    });
    
    const handleChange = (escrito  => {
        sugestao['valor'] = escrito.target.value;
        setSugestao({...sugestao});
    })

    const handleCreateSugestao = (userId, valor, edificioId) => {
        dispatch(createNovaSugestao(userId, valor, edificioId, utilizador, props.edificio))
    }

    useAuthentication();

    return(
        <Div className="row col-12 m-0">
            {props.isLoading ?
                <CommentLoading />
                :
                (<><span className="col-12 p-0">
                    <input className="form-control forms mb-2"
                        type="text" aria-label="name"
                        placeholder="Escreve uma sugestão..."
                        onChange={handleChange}
                    />
                    {sugestao.valor === '' ?
                        <button className="btnPublicarDisabled mb-3" disabled>Publicar</button>
                        :
                        <button className="btnPublicar mb-3" onClick={() => handleCreateSugestao(sugestao.userId, sugestao.valor, sugestao.edificioId)}>Publicar</button>
                    }
                </span>
                    {props.sugestoes.length === 0 ?
                    <div className="w-100 text-center textoNada py-3">Ainda não existem sugestões. Sê o primeiro a sugerir ideias para a reabilitação do edifício!</div>
                    :
                    props.sugestoes.map((sugestao, index) => {
                        return <SingleSugestao sugestao={sugestao} tipo={'edificio'} utilizador={props.userCheck}/>
                    })
                    }
                     </>)
            
            }
                    

        </Div> 
    )
}

export default Sugestoes