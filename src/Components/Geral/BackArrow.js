import React from "react"
import Back from '../../Images/BackArrow.svg';
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

const Button = styled.span`
cursor:pointer;
`



function BackArrow({isGoingBack}){
    const history = useHistory()
    return (
    <Button className="col-2 m-0 p-0" onClick={isGoingBack ? ()=>history.goBack() : ()=>history.push("/homepage")}>
        <img src={Back}/>
    </Button>
    )
}

export default BackArrow