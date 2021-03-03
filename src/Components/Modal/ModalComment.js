import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background2.svg';
import {Modal,Button} from "react-bootstrap"




function ModalComment (props) {


    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal">
            Comentário adicionado!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4></h4>
            <p>
              Obrigado pelo seu comentário!
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={props.onHide}>Fechar</Button>
          </Modal.Footer>
        </Modal>
      );  
    
};

export default ModalComment

