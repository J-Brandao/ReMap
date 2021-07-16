import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background2.svg';
import {Modal,Button} from "react-bootstrap"
import {ProgressBar} from 'react-bootstrap';
import Placeholder from '../../Images/Placeholder.jpg';

const ProfilePicture = styled.div`
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    border: solid 3px #ffa801;
    min-height: 70px;
    width: 70px;
`;

function ModalEliminarPerfil (props) {


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal" style={{color: "#34495e"}}>
        Edifício adicionado!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className="row col-12 m-0 mb-2 p-0">
          <div className="col-3 p-0">
            <ProfilePicture style={{backgroundImage:`url(${props.imagem !== null ? props.imagem : Placeholder})`}}/>
          </div>
          <div className="col-9 pr-0">
            <span className="row col-12 m-0 p-0">
              <span className="spanNivel col-8 p-0">
                <p className="mb-0 nomeUtilizador">{props.utilizador.nomeUtilizador}</p>
                <p className="mb-0 nomeNivel">Principiante</p>
              </span>
              <span className="col-4 p-0 text-right">
                <p className="nivel mb-0">{props.utilizador.progresso.nivel}</p>
              </span>
            </span>
            <ProgressBar>
              <ProgressBar now={props.utilizador.progresso.exp/10} variant="custom" key={1}/>
              <ProgressBar variant="success" now={250/10} key={2} />
            </ProgressBar>
            <span>
              <p className="mb-0 experienciaNivel">{props.utilizador.progresso.exp+250 >= 1000 ? 1000 : props.utilizador.progresso.exp+250}/1000 XP</p>
            </span>
          </div>
        </section>
        <span className="w-100">
          <button style={{float: 'right'}} class="btnConfirma" onClick={props.onHide}>Confirmar</button>
        </span>
      </Modal.Body>

      <style>
            {`
            .progress {
                background-color: #000000;
                height: 7px;
              }
              
              .bg-custom {
                background-color: #ffa801;
                color: white;
              }
            `}
        </style>
      
      
    </Modal>
  
  );  

};
export default ModalEliminarPerfil

