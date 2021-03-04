import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background2.svg';
import {Modal,Button} from "react-bootstrap"




function ModalEditarEdificio (props) {


    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal">
            Edifício Editado!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4></h4>
            <p>
              A sua edição do edifício foi submetida e está agora visível!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={props.onHide}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      );  
    
};

export default ModalEditarEdificio

