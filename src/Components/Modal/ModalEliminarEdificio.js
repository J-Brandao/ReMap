import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background2.svg';
//import Logo from '../../Images/check.svg'
import {Modal,Button} from "react-bootstrap"




function ModalEliminarEdificio (props) {


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal">
        Tem a certeza que pretende eliminar este edifíco?
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
        <Button style={{

}}
variant="warning" onClick={props.activateAccount}>Não</Button>
        </p>
        <p
        style={{
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
color: '#cc0000',
}} >
        <Button style={{

}}variant="outline-danger" onClick={props.onHide}>Sim</Button></p>
          </Modal.Body>
      
    </Modal>
  
      );  
    
};

export default ModalEliminarEdificio

