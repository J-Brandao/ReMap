import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import '../../Styles/Gamehub.css';
import Architect from '../../Images/architect.svg';
import Photographer from '../../Images/photographer.svg';
import Scroll from '../../Images/scroll.svg';
import '../../Styles/Perfil.css'


const Div = styled.div`
    margin: 40px 30px 0 30px;
`;

const BackgroundDiv1 = styled.div`
    margin: 0 auto;
    background-color: rgba(34, 112, 147, 0.5);
    border-radius: 50%;
`;
const BackgroundDiv2 = styled.div`
    margin: auto;
    background-color: #CCE6C1;
    border-radius: 50%;
`;
const BackgroundDiv3 = styled.div`
    margin: 0 auto;
    background-color: #F8A46F;
    border-radius: 50%;
`;

function CarouselEquipas({onChange, value}) {

    const [equipa, setEquipa] = useState(value);

    const mudaEquipa = ((valor) => {
        let equipaNovo;
        if(valor == "menos") {
            equipaNovo = equipa - 1;
            if(equipaNovo <= 0) {
                equipaNovo = 3;
                _onChange("Fotógrafos")
                setEquipa(equipaNovo);
            } else if (equipaNovo === 2){
                _onChange("Historiadores");
                setEquipa(equipaNovo);
            } else {
                _onChange("Fotógrafos");
                setEquipa(equipaNovo);
            }
        }
        if(valor == "mais") {
            equipaNovo = equipa + 1;
            if(equipaNovo >= 4) {
                equipaNovo = 1;
                _onChange("Arquitetos");
                setEquipa(equipaNovo);
            } else if (equipaNovo === 2){
                _onChange("Historiadores");
                setEquipa(equipaNovo);
            } else {
                _onChange("Fotógrafos");
                setEquipa(equipaNovo);
            }
        }
      })

    const _onChange = (e) => {
        onChange(e)
    }

    return(
        <>
            {equipa === 1 ?
                <section className="row col-12 m-0 p-0">
                    <span className="col-3 text-center m-0 p-0 m-auto">
                        <BackgroundDiv1 style={{minHeight: "65px", width: "65px", lineHeight: "65px"}} onClick={() => mudaEquipa("menos")}>
                            <img className="m-auto" src={Photographer}/>
                        </BackgroundDiv1>
                    </span>
                    <span className="col-6 text-center m-0 p-0 m-auto">
                        <BackgroundDiv2 style={{minHeight: "109px", width: "109px", lineHeight: "109px"}}>
                            <img className="m-auto" style={{height:`75px`}} src={Architect}/>
                        </BackgroundDiv2>
                    </span>
                    <span className="col-3 text-center m-0 p-0 m-auto">
                        <BackgroundDiv3 style={{minHeight: "65px", width: "65px", lineHeight: "65px"}} onClick={() => mudaEquipa("mais")}>
                            <img className="m-auto" src={Scroll}/>
                        </BackgroundDiv3>
                    </span>
                </section>
                :
                equipa === 2 ?
                <section className="row col-12 m-0 p-0">
                    <span className="col-3 text-center m-0 p-0 m-auto">
                        <BackgroundDiv2 style={{minHeight: "65px", width: "65px", lineHeight: "65px"}} onClick={() => mudaEquipa("menos")}>
                            <img className="m-auto" style={{height:`45px`}} src={Architect}/>
                        </BackgroundDiv2>
                    </span>
                    <span className="col-6 text-center m-0 p-0 m-auto">
                        <BackgroundDiv3 style={{minHeight: "109px", width: "109px", lineHeight: "109px"}}>
                            <img className="m-auto" style={{height:`75px`}} src={Scroll}/>
                        </BackgroundDiv3>
                    </span>
                    <span className="col-3 text-center m-0 p-0 m-auto">
                        <BackgroundDiv1 style={{minHeight: "65px", width: "65px", lineHeight: "65px"}} onClick={() => mudaEquipa("mais")}>
                            <img className="m-auto" src={Photographer}/>
                        </BackgroundDiv1>
                    </span>
                </section>
                :
                <section className="row col-12 m-0 p-0">
                    <span className="col-3 text-center m-0 p-0 m-auto">
                        <BackgroundDiv3 style={{minHeight: "65px", width: "65px", lineHeight: "65px"}} onClick={() => mudaEquipa("menos")}>
                            <img className="m-auto" src={Scroll}/>
                        </BackgroundDiv3>
                    </span>
                    <span className="col-6 text-center m-0 p-0 m-auto">
                        <BackgroundDiv1 style={{minHeight: "109px", width: "109px", lineHeight: "109px"}}>
                            <img className="m-auto" style={{height:`75px`}} src={Photographer}/>
                        </BackgroundDiv1>
                    </span>
                    <span className="col-3 text-center m-0 p-0 m-auto">
                        <BackgroundDiv2 style={{minHeight: "65px", width: "65px", lineHeight: "65px"}} onClick={() => mudaEquipa("mais")}>
                            <img className="m-auto" style={{height:`45px`}} src={Architect}/>
                        </BackgroundDiv2>
                    </span>
                </section>
            }
        </>
    )
}

export default CarouselEquipas;