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
      size="lg"
      aria-labelledby="contained-modal-title"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal">
        Perfil criado!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p>
          Agora faz parte da comunidade ReMap! Explore todas as funcionalidades da aplicação e participe na nossa comunidade!
        </p>
        
<button style={{
position: 'absolute',
bottom:10,
left:284,
}}class="botaoFotografia" onClick={props.onHide}>Confirmar</button>
      </Modal.Body>
      
      
      
    </Modal>
  
  );  

};
export default ModalEliminarPerfil

