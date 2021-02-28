import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import '../../Styles/PaginaEdificio.css';
import Perfil from '../../Images/Perfil.jpg';
import { createNovaSugestao } from '../../Store/Sugestoes/Actions';
import { useDispatch } from 'react-redux';
import useAuthentication from '../../Firebase/useAuthentication';

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

    const dispatch = useDispatch();
    const [sugestao, setSugestao] = useState({
        valor: '',
        userId: props.utilizador,
        edificioId: props.edificio
    });
    
    const handleChange = (escrito  => {
        sugestao['valor'] = escrito.target.value;
        setSugestao({...sugestao});
    })

    const handleCreateSugestao = (userId, valor, edificioId) => {
        dispatch(createNovaSugestao(userId, valor, edificioId))
    }

    useAuthentication();

    return(
        <Div className="row col-12 m-0">
            <span className="col-12 p-0">
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
            <span className="col-3 p-0">
                <CommentPicture/>
            </span>
            <span className="col-9 pr-0">
                <p className="NomeComments">Pedro Alves</p>
                <p className="textoComments">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </span>
        </Div> 
    )
}

export default Sugestoes