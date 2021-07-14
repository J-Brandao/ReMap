import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background2.svg';
//import Logo from '../../Images/check.png';
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
        Deseja reativar a sua conta?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4></h4>
        <p
        style={{
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
}} >
        <Button variant="warning" onClick={props.activateAccount}>Sim</Button>
        </p>
        <p
        style={{
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
color: '#cc0000',
}} >
        <Button style={{
borderColor:'#34495e',
}}variant="outline-danger" onClick={props.onHide}>Não</Button></p>
          </Modal.Body>
      
    </Modal>
  
  );  

};
export default ModalEliminarPerfil

