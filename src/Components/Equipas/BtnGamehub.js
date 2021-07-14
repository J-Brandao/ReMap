import React from 'react';
import '../../Styles/Gamehub.css';
import Architect from '../../Images/architect.svg';
import Scroll from '../../Images/scroll.svg';
import Photographer from '../../Images/photographer.svg';
import ArrowTeam from '../../Images/Arrow2.svg';
import '../../Styles/Perfil.css'

function BtnGamehub({team}) {

    return(
        <>
        {team === "Arquitetos" ? 
            <section className="row col-12 m-0 p-0 btnTeam" style={{backgroundColor: "#cce6c1", border: "solid 1px #62b240"}}>
                <span className="col-3 text-right m-auto p-0">
                    <img className="m-0" src={Architect}/>
                </span>
                <span className="nomeEquipa col-6 text-center m-auto p-0">Arquitetos</span>
                <span className="col-3 m-auto">
                    <img className="m-0" src={ArrowTeam}/>
                </span>
            </section>
            :
            team === "Historiadores" ? 
            <section className="row col-12 m-0 p-0 btnTeam" style={{backgroundColor: "#F8A46F", border: "solid 1px #D58244"}}>
                <span className="col-3 text-right m-auto p-0">
                    <img className="m-0" src={Scroll}/>
                </span>
                <span className="nomeEquipa col-6 text-center m-auto p-0">Historiadores</span>
                <span className="col-3 m-auto">
                    <img className="m-0" src={ArrowTeam}/>
                </span>
            </section>
            :
            <section className="row col-12 m-0 p-0 btnTeam"  style={{backgroundColor: "rgba(37, 150, 190, 0.5)", border: "solid 1px #006EC5"}}>
                <span className="col-3 text-right m-auto p-0">
                    <img className="m-0" src={Photographer}/>
                </span>
                <span className="nomeEquipa col-6 text-center m-auto p-0">Fotógrafos</span>
                <span className="col-3 m-auto">
                    <img className="m-0" src={ArrowTeam}/>
                </span>
            </section>
        }
        </>
    )
}

export default BtnGamehub;