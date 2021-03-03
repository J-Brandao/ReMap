import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background2.svg';
import Logo from '../../Images/check.png';
import {Modal,Button} from "react-bootstrap"




function ModalEliminarPerfil (props) {


  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal">
        Fotografia adicionada!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p>
          Obrigado por ter adicionado a fotografia, está agora visível para toda a gente!
        </p>
        <button class="btnPublicarDisabled mb-3" disabled="" onClick={props.onHide}>Fechar</button>
      </Modal.Body>
      
      
      
    </Modal>
  );  

};
export default ModalEliminarPerfil

