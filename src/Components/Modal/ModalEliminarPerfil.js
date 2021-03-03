import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background2.svg';
//import Logo from '../../Images/check.svg'
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
            Deseja eliminar a sua conta?
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
            <Button variant="secondary" onClick={props.onHide}>Não</Button>
            </p>
            <p
            style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}} >
            <Button variant="danger" onClick={props.onDelete}>Sim</Button></p>
              </Modal.Body>
          
        </Modal>
      );  
    
};

export default ModalEliminarPerfil

