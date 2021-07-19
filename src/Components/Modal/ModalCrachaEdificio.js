import React from "react"
import styled from 'styled-components'
import Broken from '../../Images/BrokenHouse.svg';
import Background from '../../Images/Background2.svg';
import {Modal,Button} from "react-bootstrap"
import badgeEdificio_1 from '../../Images/badges/badgeEdificio_1.svg';
import badgeEdificio_2 from '../../Images/badges/badgeEdificio_2.svg';
import badgeEdificio_3 from '../../Images/badges/badgeEdificio_3.svg';




function ModalCrachaEdificio (props) {


    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal" style={{color: "#34495e"}}>
            Parabéns!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <section className="row col-12 m-0 mb-2 p-0" style={{display: "flex", flexDirection:"row", alignItems:"center"}}>
              <div className="col-3 p-0">
                <img className="m-0" src={props.numero == 15 ? badgeEdificio_1 : props.numero == 50 ? badgeEdificio_2 : badgeEdificio_3}/>
              </div>
              <div className="col-9 pr-0">
                <p style={{margin: "0", fontSize:"15px"}}>Desbloqueaste um novo crachá sobre edifícios!</p>
              </div>
            </section>
            <span className="w-100">
              <button style={{float: 'right'}} class="btnConfirma" onClick={props.onHide}>Confirmar</button>
            </span>
          </Modal.Body>
        </Modal>
      );  
    
};

export default ModalCrachaEdificio

