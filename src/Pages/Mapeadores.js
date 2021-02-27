import React from 'react'
import styled from "styled-components"
import { Link, useHistory } from "react-router-dom"
import Header from "../Components/Mapeadores/Header"

const Button = styled.button`
    border: solid 2px #227093;
    border-radius: 0;
    height: 46px;
    font-size: 18px;
    color: #34495e;
`;



function Mapeadores() {
  
  const history = useHistory()
  
  const changeSection = (e) => {
  history.push(`/mapeadores/${e}`)
}
  return (
    <div className={"m-0 p-0"}>
      <Header />
      <div className="row col-12 m-0 p-0">
        
          <Button className="btn col-6 m-0 p-0" onClick={()=>changeSection("amigos")}>Amigos</Button>
       

        
                        <Button className="btn col-6 m-0 p-0"  onClick={()=>changeSection("comunidade")}>Comunidade</Button>
        
            </div>
    </div>
  )
}

export default Mapeadores
